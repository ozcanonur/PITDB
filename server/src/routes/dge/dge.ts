import express from 'express';
import numeral from 'numeral';

import { DGE } from '../../db/models/dge';
import { ReadCount } from '../../db/models/readCount';
import { ExtendedRequest, DGEFilters } from './types';
import { parseReadCount } from './helpers';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { skip, filters } = req.query;

  try {
    const { maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;

    const query = {
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    };

    const dges = await DGE.find(query).skip(parseInt(skip)).limit(50);
    if (!dges) return res.send({ dges: [], dgesCount: 0 });

    const dgesCount = await DGE.countDocuments(query);

    // WOOP, hard coding peptide evidence
    const parsedDges = dges.map((dge) => {
      const { symbol, log2fc, padj } = dge;
      const formattedlog2fc = numeral(log2fc).format('0.000');
      const formattedpadj = numeral(padj).format('0.000e+0');
      return {
        symbol,
        log2fc: formattedlog2fc,
        padj: formattedpadj,
        hasPeptideEvidence: false,
      };
    });

    res.send({ dges: parsedDges, dgesCount });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

router.get('/symbolNames', async (req: ExtendedRequest, res) => {
  const { searchInput } = req.query;

  try {
    if (!searchInput) return res.send([]);

    const query = [
      { $match: { symbol: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$symbol' } },
      { $limit: 50 },
    ];
    // WOOP, Need project id here
    const symbolNames = await DGE.aggregate(query);

    if (!symbolNames) return res.send([]);

    const parsedSymbolNames = symbolNames.map((name) => ({ value: name._id, label: name._id }));

    res.send(parsedSymbolNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/bySymbolName', async (req: ExtendedRequest, res) => {
  const { symbol } = req.query;

  try {
    const query = { symbol };
    const dges = await DGE.find(query);
    if (!dges) return res.send([]);

    const parsedDges = dges.map((dge) => {
      const { symbol, log2fc, padj } = dge;
      const formattedlog2fc = numeral(log2fc).format('0.000');
      const formattedpadj = numeral(padj).format('0.000e+0');
      return {
        symbol,
        log2fc: formattedlog2fc,
        padj: formattedpadj,
        hasPeptideEvidence: false,
      };
    });

    res.send(parsedDges);
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

router.get('/readCount', async (req: ExtendedRequest, res) => {
  const { symbol } = req.query;

  try {
    const { counts } = await ReadCount.findOne({ gene: symbol });
    if (!counts) return res.send([]);

    res.send(counts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
