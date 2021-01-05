import express from 'express';
import flatten from 'flat';

import { AllTranscript } from '../../db/models/allTranscript';
import { ExtendedRequest } from '../../types';
import { parseTranscriptsForViewer } from './helpers';
import { GeneBrowserFilters } from './types';

const router = express.Router();

/*
 * Route for getting transcripts for transcript usages event viewer
 * Filters by project and gene and given filters
 */
router.get('/transcripts', async (req: ExtendedRequest, res) => {
  const { project, gene, filters } = req.query;

  const parsedFilters = JSON.parse(filters) as GeneBrowserFilters;
  const { conditions, minTPM, minQual } = parsedFilters;

  try {
    let transcripts = await AllTranscript.find({ project, gene });

    // Filter by selected conditions and min TPM
    transcripts = transcripts.filter(
      ({ TPM }) =>
        conditions.some((condition) => Object.keys(TPM).includes(condition)) &&
        Object.values(flatten(TPM)).every((value) => value >= minTPM)
    );

    const parsedTranscripts = parseTranscriptsForViewer(transcripts);

    res.send(parsedTranscripts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for gene browser gene single select choices
 * Filters by project, and finds gene names that start with the searchInput
 * Groups by gene name to get a unique list
 */
router.get('/gene-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames: { _id: string }[] = await AllTranscript.aggregate([
      { $match: { project, gene: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$gene' } },
      { $limit: 20 },
    ]);

    res.send(geneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
