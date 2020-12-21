import express from 'express';

import { Mutation } from '../../db/models/mutation';
import { parseConditions, parseTypeFiltersForMongoose } from './helpers';
import { ExtendedRequest, MutationFilters } from './types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { projectId, skip, filters } = req.query;

  try {
    const parsedFilters = JSON.parse(filters) as MutationFilters;

    for (const key of Object.keys(parsedFilters)) {
      // @ts-ignore
      if (parsedFilters[key].length === 0) return res.send({ mutations: [], mutationsCount: 0 });
    }

    const { type: typeFilters, inCDS, hasPeptideEvidence } = parsedFilters;
    const mongooseTypeFilter = parseTypeFiltersForMongoose(typeFilters);

    // Have to convert string boolean to boolean
    const query = {
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      $or: mongooseTypeFilter,
    };

    const mutations = await Mutation.find(query).skip(parseInt(skip)).limit(50);
    if (!mutations) return res.send({ mutations: [], mutationsCount: 0 });

    const mutationsCount = await Mutation.countDocuments(query);

    const parsedMutations = mutations.map((mutation) => {
      const { ref, gene, refPos, inCDS, alt, hasPeptideEvidence } = mutation;
      const type = !ref ? 'INS' : !alt ? 'DEL' : 'SNP';

      return {
        gene,
        refPos,
        type,
        ref,
        alt,
        inCDS: inCDS.toString(),
        hasPeptideEvidence: hasPeptideEvidence.toString(),
      };
    });

    res.send({ mutations: parsedMutations, mutationsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/geneNames', async (req: ExtendedRequest, res) => {
  const { projectId, searchInput } = req.query;

  try {
    if (!searchInput) return res.send([]);

    const query = [
      { $match: { project: projectId } },
      { $match: { gene: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$gene' } },
      { $limit: 50 },
    ];

    const geneNames = await Mutation.aggregate(query);

    if (!geneNames) return res.send([]);

    const parsedGeneNames = geneNames.map((name) => ({ value: name._id, label: name._id }));

    res.send(parsedGeneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/byGeneName', async (req: ExtendedRequest, res) => {
  const { projectId, geneName } = req.query;

  try {
    const query = { project: projectId, gene: geneName };
    const mutations = await Mutation.find(query);
    if (!mutations) return res.send([]);

    const parsedMutations = mutations.map((mutation) => {
      const { ref, gene, refPos, inCDS, alt, hasPeptideEvidence } = mutation;
      const type = !ref ? 'INS' : !alt ? 'DEL' : 'SNP';

      return {
        gene,
        refPos,
        type,
        ref,
        alt,
        inCDS: inCDS.toString(),
        hasPeptideEvidence: hasPeptideEvidence.toString(),
      };
    });

    res.send(parsedMutations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/conditions', async (req: ExtendedRequest, res) => {
  const { projectId, gene, position } = req.query;

  try {
    const query = { project: projectId, gene, refPos: parseInt(position) };
    const { conditions } = await Mutation.findOne(query);
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
  const { projectId, filters } = req.query;

  try {
    const { type: typeFilters, inCDS, hasPeptideEvidence } = JSON.parse(filters) as MutationFilters;

    let snps = 0;
    let dels = 0;
    let inss = 0;

    const query = {
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
    };

    if (typeFilters.includes('SNP'))
      snps = await Mutation.countDocuments({ ...query, $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] });
    if (typeFilters.includes('DEL')) dels = await Mutation.countDocuments({ ...query, alt: { $eq: '' } });
    if (typeFilters.includes('INS')) inss = await Mutation.countDocuments({ ...query, ref: { $eq: '' } });

    res.send({ SNP: snps, DEL: dels, INS: inss });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
