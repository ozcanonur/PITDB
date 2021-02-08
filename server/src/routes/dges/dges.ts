import express from 'express';
// @ts-ignore
import replaceall from 'replaceall';

import { DGE } from '../../db/models/dge';
import { ReadCount } from '../../db/models/readCount';
import { DGEFilters, DGEsWithTranscript } from './types';
import { ExtendedRequest } from '../../types';

import { parseVolcanoPlotData, convertSortFieldNameForMongoose } from './helpers';

const router = express.Router();

/*
 * Route for differential gene expression table data
 * Filters by project, max p value, min absolute fold change
 * Sorts if sortedOn passed in request
 * Response is limited to 50 rows per request
 */
router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const { symbol, maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    let query = {
      project,
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    };

    if (symbol)
      // @ts-ignore
      query = { ...query, symbol };

    const dges: DGEsWithTranscript[] = await DGE.aggregate([
      { $match: query },
      { $sort: { [convertSortFieldNameForMongoose(field)]: order } },
      { $skip: parseInt(skip) },
      { $limit: 50 },
      {
        $lookup: {
          from: 'allTranscripts',
          localField: 'symbol',
          foreignField: 'gene',
          as: 'transcripts',
        },
      },
    ]);

    if (!dges) return res.send({ dges: [], dgesCount: 0 });

    const parsedDges = dges.map(({ symbol, log2fc, padj, transcripts }) => ({
      symbol,
      log2fc,
      padj,
      conditions: transcripts ? replaceall(',', ', ', Object.keys(transcripts[0].TPM).toString()) : undefined,
    }));

    const dgesCount: number = await DGE.countDocuments(query);

    res.send({ dges: parsedDges, dgesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for differential gene expression table single select choices
 * Filters by project, and finds symbol names that start with the searchInput
 * Groups by symbol name to get a unique list
 */
router.get('/symbol-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const symbolNames: { _id: string }[] = await DGE.aggregate([
      { $match: { project, symbol: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$symbol' } },
      { $limit: 20 },
    ]);

    if (!symbolNames) return res.send([]);

    res.send(symbolNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting read counts for the selected symbol for bar chart
 * Filters by project and symbol
 */
router.get('/read-count', async (req: ExtendedRequest, res) => {
  const { project, symbol } = req.query;

  try {
    const { counts } = await ReadCount.findOne({ project, gene: symbol });

    if (!counts) return res.send({});

    res.send(counts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting volcano plot data
 * Filters by project, max p value and min abs fold change
 */
router.get('/volcano-plot', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  try {
    const { maxPValue, minAbsFoldChange } = JSON.parse(filters) as DGEFilters;

    const dges = await DGE.find({
      project,
      padj: { $lt: maxPValue },
      $or: [{ log2fc: { $gte: minAbsFoldChange } }, { log2fc: { $lte: -minAbsFoldChange } }],
    });

    const { data, fcMin, fcMax, pMax } = parseVolcanoPlotData(dges);

    res.send({ data, fcMin, fcMax, pMax });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
