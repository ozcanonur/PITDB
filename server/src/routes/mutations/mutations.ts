import express from 'express';

import { Mutation } from '../../db/models/mutation';
import { parseConditions, convertSortFieldNameForMongoose, parseMutations } from './helpers';
import { MutationFilters } from './types';
import { ExtendedRequest } from '../../types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const parsedFilters = JSON.parse(filters) as MutationFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    for (const key of Object.keys(parsedFilters)) {
      // @ts-ignore
      if (parsedFilters[key].length === 0) return res.send({ mutations: [], mutationsCount: 0 });
    }

    const { type: typeFilters, inCDS, hasPeptideEvidence } = parsedFilters;

    // Have to convert string boolean to boolean
    const query = {
      project,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      type: { $in: typeFilters },
    };

    const mutations = await Mutation.find(query)
      .sort({ [convertSortFieldNameForMongoose(field)]: order })
      .skip(parseInt(skip))
      .limit(50);

    if (!mutations) return res.send({ mutations: [], mutationsCount: 0 });

    const mutationsCount = await Mutation.countDocuments(query);

    const parsedMutations = parseMutations(mutations);

    res.send({ mutations: parsedMutations, mutationsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/gene-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames = await Mutation.aggregate([
      { $match: { project, gene: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$gene' } },
      { $limit: 50 },
    ]);

    if (!geneNames) return res.send([]);

    const parsedGeneNames = geneNames.map((name) => ({ value: name._id, label: name._id }));

    res.send(parsedGeneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/by-gene-name', async (req: ExtendedRequest, res) => {
  const { project, geneName } = req.query;

  try {
    const mutations = await Mutation.find({ project, gene: geneName });
    if (!mutations) return res.send([]);

    const parsedMutations = parseMutations(mutations);

    res.send(parsedMutations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

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

router.get('/types', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  try {
    const { type: typeFilters, inCDS, hasPeptideEvidence } = JSON.parse(filters) as MutationFilters;

    // WOOP, maybe use
    // $group: { _id: '$eventType', count: { $sum: 1 } },
    // As you did in splicing events?
    const counts = await Mutation.aggregate([
      {
        $match: {
          project,
          hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
          inCDS: { $in: inCDS.map((e) => e === 'true') },
          type: { $in: typeFilters },
        },
      },
      {
        $facet: {
          SNP: typeFilters.includes('SNP') ? [{ $match: { type: 'SNP' } }, { $count: 'SNP' }] : [],
          DEL: typeFilters.includes('DEL') ? [{ $match: { type: 'DEL' } }, { $count: 'DEL' }] : [],
          INS: typeFilters.includes('INS') ? [{ $match: { type: 'INS' } }, { $count: 'INS' }] : [],
        },
      },
      {
        $project: {
          SNP: { $arrayElemAt: ['$SNP.SNP', 0] },
          DEL: { $arrayElemAt: ['$DEL.DEL', 0] },
          INS: { $arrayElemAt: ['$INS.INS', 0] },
        },
      },
    ]);

    res.send(...counts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
