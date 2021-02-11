import express from 'express';
import { max, mean } from 'lodash';

import { AllTranscript } from '../../db/models/allTranscript';
import { Mutation } from '../../db/models/mutation';
import { ExtendedRequest } from '../../types';
import { parseTranscriptsForViewer, parseMutations } from './helpers';
import { GeneBrowserFilters } from './types';

const router = express.Router();

/*
 * Route for getting transcripts for transcript usages event viewer
 * Filters by project and gene and given filters
 */
router.get('/transcripts', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  const parsedFilters = JSON.parse(filters) as GeneBrowserFilters;
  const { gene, minTPM, minQual } = parsedFilters;

  try {
    const transcripts = await AllTranscript.find({ project, gene });

    const filteredTranscripts = transcripts.filter(({ TPM }) => {
      const meanTPMs = Object.keys(TPM).map((condition) => mean(Object.values(TPM[condition])));
      return meanTPMs.some((e) => e >= minTPM);
    });

    const mutations = await Mutation.find({ gene });

    const parsedMutations = parseMutations(mutations, minQual);
    const parsedTranscripts = parseTranscriptsForViewer(filteredTranscripts, parsedMutations);

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

/* Route to get the maximum TPM
 */
router.get('/max-tpm', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  const parsedFilters = JSON.parse(filters) as GeneBrowserFilters;
  const { gene } = parsedFilters;

  try {
    const transcripts = await AllTranscript.find({ project, gene });

    const meanTPMs = transcripts
      .map(({ TPM }) => Object.keys(TPM).map((condition) => mean(Object.values(TPM[condition]))))
      .flat();

    res.send({ maxTPM: max(meanTPMs) });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
