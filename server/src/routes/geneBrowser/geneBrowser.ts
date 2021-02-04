import express from 'express';
import flatten from 'flat';
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
  const { gene, condition, minTPM, minQual } = parsedFilters;

  try {
    const transcripts = await AllTranscript.find({ project, gene });

    // Filter by selected conditions and min TPM
    const filteredTranscripts = transcripts.filter(
      ({ TPM }) => TPM[condition] && mean(Object.values(TPM[condition])) >= minTPM
    );

    const mutations = await Mutation.find({ gene });
    // @ts-ignore
    const filteredMutations = mutations.filter(({ conditions }) => conditions[condition]);

    const parsedMutations = parseMutations(filteredMutations);

    const parsedTranscripts = parseTranscriptsForViewer(filteredTranscripts, parsedMutations, condition);

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
  const { gene, condition } = parsedFilters;

  try {
    const transcripts = await AllTranscript.find({ project, gene });

    // Filter by selected conditions
    const filteredTranscripts = transcripts.filter(({ TPM }) => Object.keys(TPM).includes(condition));

    const selectedConditionTPMvalues = filteredTranscripts
      .map(({ TPM }) => Object.values(TPM[condition]))
      .flat();

    res.send({ maxTPM: max(selectedConditionTPMvalues) });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
