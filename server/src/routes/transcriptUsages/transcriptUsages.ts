import express from 'express';
// @ts-ignore
import replaceall from 'replaceall';

import { ExtendedRequest } from '../../types';
import { TranscriptUsageDPSI } from '../../db/models/transcriptUsageDPSI';
import { TranscriptUsage } from '../../db/models/transcriptUsage';
import { TranscriptCount } from '../../db/models/transcriptCount';
import {
  findMongoFieldFromTableColumn,
  parseTranscriptsForViewer,
  parseConditionsByGeneName,
  parseReadCounts,
} from './helpers';

import { TranscriptUsageFilters, TranscriptUsagesWithTranscript } from './types';

const router = express.Router();

/*
 * Route for transcript usages table data
 * Filters by project and max p value
 * Sorts if sortedOn passed in request
 * Response is limited to 50 rows per request
 */
router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const { gene, maxPValue } = JSON.parse(filters) as TranscriptUsageFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    let query = {
      project,
      pval: { $lt: maxPValue },
    };

    if (gene)
      // @ts-ignore
      query = { ...query, geneName: gene };

    const transcriptUsages: TranscriptUsagesWithTranscript[] = await TranscriptUsageDPSI.aggregate([
      { $match: query },
      { $sort: { [findMongoFieldFromTableColumn(field)]: order } },
      { $skip: parseInt(skip) },
      { $limit: 50 },
      {
        $lookup: {
          from: 'allTranscripts',
          localField: 'transcript',
          foreignField: 'transcriptID',
          as: 'transcripts',
        },
      },
    ]);

    if (!transcriptUsages) return res.send({ transcriptUsages: [], transcriptUsagesCount: 0 });

    const parsedTranscriptUsages = transcriptUsages.map((transcriptUsage) => {
      const { geneName, transcript, deltaPsi, pval, transcripts } = transcriptUsage;

      return {
        geneName,
        transcript,
        deltaPsi,
        pval,
        conditions: transcripts
          ? replaceall(',', ', ', Object.keys(transcripts[0].TPM).toString())
          : undefined,
      };
    });

    const transcriptUsagesCount = await TranscriptUsageDPSI.countDocuments(query);

    res.send({ transcriptUsages: parsedTranscriptUsages, transcriptUsagesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for transcript usages single select choices
 * Filters by project, and finds gene names that start with the searchInput
 * Groups by gene names to get a unique list
 */
router.get('/gene-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames: { _id: string }[] = await TranscriptUsageDPSI.aggregate([
      { $match: { project, geneName: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$geneName' } },
      { $limit: 20 },
    ]);

    res.send(geneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting transcripts for transcript usages event viewer
 * Filters by project and gene
 */
router.get('/transcripts', async (req: ExtendedRequest, res) => {
  const { project, gene } = req.query;

  try {
    const transcriptUsages: TranscriptUsagesWithTranscript[] = await TranscriptUsageDPSI.aggregate([
      { $match: { project, geneName: gene } },
      {
        $lookup: {
          from: 'allTranscripts',
          localField: 'transcript',
          foreignField: 'transcriptID',
          as: 'transcripts',
        },
      },
    ]);

    const transcripts = transcriptUsages.map((transcriptUsage) => transcriptUsage.transcripts[0]);
    const parsedTranscripts = parseTranscriptsForViewer(transcripts);

    res.send(parsedTranscripts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting read counts for transcript usages bar chart
 * Filters by project and transcript
 */
router.get('/read-counts', async (req: ExtendedRequest, res) => {
  const { project, transcript } = req.query;

  try {
    const transcriptCount = await TranscriptCount.findOne({ project, transcript });

    const parsedReadCount = parseReadCounts(transcriptCount.readCounts);

    res.send(parsedReadCount);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting transcript usage confidence bar chart data
 * Filters by project and gene name
 */
router.get('/conditions-by-gene-name', async (req: ExtendedRequest, res) => {
  const { project, gene } = req.query;

  try {
    const transcriptUsages = await TranscriptUsage.find({ project, geneName: gene });

    if (!transcriptUsages) return res.send([]);

    const conditionsByGeneName = parseConditionsByGeneName(transcriptUsages);

    res.send(conditionsByGeneName);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
