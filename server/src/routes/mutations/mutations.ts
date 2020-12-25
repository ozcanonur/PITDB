import express from 'express';

import { Mutation } from '../../db/models/mutation';
import { parseConditions, convertSortFieldNameForMongoose } from './helpers';
import { MutationFilters } from './types';
import { ExtendedRequest } from '../../types';

const router = express.Router();

/*
 * Route for mutations table data
 * Filters by project, max p value, min absolute fold change
 * Sorts if sortedOn passed in request
 * Response is limited to 50 rows per request
 */
router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const parsedFilters = JSON.parse(filters) as MutationFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    const { variantType, inCDS, hasPeptideEvidence, isSynonymous } = parsedFilters;

    // Have to convert string boolean to boolean
    const query = {
      project,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      type: { $in: variantType },
      silent: { $in: isSynonymous.map((e) => e === 'true') },
    };

    const mutations = await Mutation.find(query)
      .sort({ [convertSortFieldNameForMongoose(field)]: order })
      .skip(parseInt(skip))
      .limit(50);

    if (!mutations) return res.send({ mutations: [], mutationsCount: 0 });

    const mutationsCount = await Mutation.countDocuments(query);

    const parsedMutations = mutations.map(({ ref, gene, refPos, inCDS, alt, hasPeptideEvidence, type, silent }) => ({
      gene,
      refPos,
      type,
      ref,
      alt,
      silent,
      inCDS,
      hasPeptideEvidence,
    }));

    res.send({ mutations: parsedMutations, mutationsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for mutations table single select choices
 * Filters by project, and finds symbol names that start with the searchInput
 * Groups by symbol name to get a unique list
 */
router.get('/gene-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames: { _id: string }[] = await Mutation.aggregate([
      { $match: { project, gene: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$gene' } },
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
    const mutations = await Mutation.find({ project, gene: geneName });

    if (!mutations) return res.send([]);

    const parsedMutations = mutations.map(({ ref, gene, refPos, inCDS, alt, hasPeptideEvidence, type, silent }) => ({
      gene,
      refPos,
      type,
      ref,
      alt,
      silent,
      inCDS,
      hasPeptideEvidence,
    }));

    res.send(parsedMutations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting conditions data(AF, qual) for mutation bar charts for a gene and position
 * Filters by project, gene and position
 */
router.get('/conditions', async (req: ExtendedRequest, res) => {
  const { project, gene, position } = req.query;

  try {
    const { conditions } = await Mutation.findOne({ project, gene, refPos: parseInt(position) });

    if (!conditions) return res.sendStatus(500);

    // @ts-ignore
    const parsedConditions = parseConditions(conditions);
    res.send(parsedConditions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting variant type distribution data for mutation pie chart
 * Filters by project and given filters
 */
router.get('/types', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  try {
    const { variantType, inCDS, hasPeptideEvidence } = JSON.parse(filters) as MutationFilters;

    const counts: { _id: string; count: number }[] = await Mutation.aggregate([
      {
        $match: {
          project,
          hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
          inCDS: { $in: inCDS.map((e) => e === 'true') },
          type: { $in: variantType },
        },
      },
      {
        $group: { _id: '$type', count: { $sum: 1 } },
      },
    ]);

    const parsedCounts: { [type: string]: number } = {};
    counts.forEach((count) => {
      parsedCounts[count._id] = count.count;
    });

    res.send(parsedCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
