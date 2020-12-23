import express from 'express';

import { DGE } from '../../db/models/dge';
import { ReadCount } from '../../db/models/readCount';
import { DGEFilters } from './types';
import { ExtendedRequest } from '../../types';

import { parseValuesForVolcanoPlotAndFindMinMax, parseDges, convertSortFieldNameForMongoose } from './helpers';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const { maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    const query = {
      project,
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    };

    const dges = await DGE.find(query)
      .sort({ [convertSortFieldNameForMongoose(field)]: order })
      .skip(parseInt(skip))
      .limit(50);
    if (!dges) return res.send({ dges: [], dgesCount: 0 });

    const parsedDges = parseDges(dges);

    const dgesCount = await DGE.countDocuments(query);

    res.send({ dges: parsedDges, dgesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/symbolNames', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  try {
    if (!searchInput) return res.send([]);

    const symbolNames = await DGE.aggregate([
      { $match: { project, symbol: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$symbol' } },
      { $limit: 50 },
    ]);

    if (!symbolNames) return res.send([]);

    const parsedSymbolNames = symbolNames.map((name) => ({ value: name._id, label: name._id }));

    res.send(parsedSymbolNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/bySymbolName', async (req: ExtendedRequest, res) => {
  const { project, symbol } = req.query;

  try {
    const dges = await DGE.find({ project, symbol });
    if (!dges) return res.send([]);

    const parsedDges = parseDges(dges);

    res.send(parsedDges);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/readCount', async (req: ExtendedRequest, res) => {
  const { project, symbol } = req.query;

  try {
    const { counts } = await ReadCount.findOne({ project, gene: symbol });
    if (!counts) return res.send([]);

    res.send(counts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Unnecessary, main route already gets this, just need to parse it aswell.
router.get('/volcanoPlot', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  try {
    const { maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;

    const dges = await DGE.find({
      project,
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    });

    const { parsed, fcMin, fcMax, pMax } = parseValuesForVolcanoPlotAndFindMinMax(dges);

    res.send({ data: parsed, fcMin, fcMax, pMax });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
