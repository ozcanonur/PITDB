import express from 'express';

import { ExtendedRequest } from '../../types';
import { TranscriptUsageDPSI } from '../../db/models/transcriptUsageDPSI';
import { TranscriptUsage } from '../../db/models/transcriptUsage';
import { TranscriptCount } from '../../db/models/transcriptCount';
import {
  findMongoFieldFromTableColumn,
  parseTranscriptUsages,
  parseTranscriptsForViewer,
  parseConditionsByGeneName,
} from './helpers';
import { TranscriptUsageFilters, TranscriptUsagesWithTranscript, ConditionsByGeneName } from './types';

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
    const { maxPValue } = JSON.parse(filters) as TranscriptUsageFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    const query = {
      project,
      pval: { $lt: maxPValue },
      // pepEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
    };

    const transcriptUsages = await TranscriptUsageDPSI.find(query)
      .sort({ [findMongoFieldFromTableColumn(field)]: order })
      .skip(parseInt(skip))
      .limit(50);

    if (!transcriptUsages) return res.send({ transcriptUsages: [], transcriptUsagesCount: 0 });

    const parsedTranscriptUsages = transcriptUsages.map((transcriptUsage) => {
      const { geneName, transcript, deltaPsi, pval } = transcriptUsage;

      // WOOP, hard coding peptide evidence
      return {
        geneName,
        transcript,
        deltaPsi,
        pval,
        hasPeptideEvidence: false,
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
      { $limit: 50 },
    ]);

    res.send(geneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting entries by gene name
 * Filters by project and gene name
 */
router.get('/by-gene-name', async (req: ExtendedRequest, res) => {
  const { project, geneName } = req.query;

  try {
    const transcriptUsages = await TranscriptUsageDPSI.find({ project, geneName });
    if (!transcriptUsages) return res.send([]);

    const parsedTranscriptUsages = parseTranscriptUsages(transcriptUsages);

    res.send(parsedTranscriptUsages);
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

    const parsedReadCounts = Object.keys(transcriptCount.readCounts).map((condition) => {
      return {
        condition,
        readCount: transcriptCount.readCounts[condition],
      };
    });

    res.send(parsedReadCounts);
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
