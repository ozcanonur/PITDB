import express from 'express';
import { uniq } from 'lodash';

import { DGE } from '../../db/models/dge';
import { ExtendedRequest, DGEFilters } from './types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { skip, filters } = req.query;

  try {
    const { maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;

    const dges = await DGE.find({
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    })
      .skip(parseInt(skip))
      .limit(50);

    if (!dges) return res.send({ dges: [], dgesCount: 0 });

    const dgesCount = await DGE.countDocuments({
      padj: { $lte: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    });

    const parsedDges = dges.map((dge) => {
      const { symbol, log2fc, padj } = dge;
      return {
        symbol,
        log2fc,
        padj,
      };
    });

    res.send({ dges: parsedDges, dgesCount });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/symbolNames', async (req: ExtendedRequest, res) => {
  const { searchInput } = req.query;

  try {
    if (!searchInput) return res.send([]);
    const dges = await DGE.find({ symbol: RegExp(`^${searchInput}`, 'i') }).limit(100);
    if (!dges) return res.send([]);

    const symbolNames = uniq(dges.map((dge) => dge.symbol));
    const parsedSymbolNames = symbolNames.map((name) => ({ value: name, label: name }));

    res.send(parsedSymbolNames);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/bySymbolName', async (req: ExtendedRequest, res) => {
  const { symbol } = req.query;

  try {
    const dges = await DGE.find({ symbol });
    if (!dges) return res.send([]);

    const parsedDges = dges.map((dge) => {
      const { symbol, log2fc, padj } = dge;
      return {
        symbol,
        log2fc,
        padj,
      };
    });

    res.send(parsedDges);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
