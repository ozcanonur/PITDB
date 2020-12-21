import express from 'express';
import { uniq } from 'lodash';

import { Mutation } from '../../db/models/mutation';
import { parseConditions } from './helpers';
import { ExtendedRequest, MutationFilters } from './types';

const router = express.Router();

const parseTypeFiltersForMongoose = (typeFilters: [string?, string?, string?]) => {
  return typeFilters.map((typeFilter) => {
    if (typeFilter === 'INS') return { ref: '' };
    if (typeFilter === 'DEL') return { alt: '' };
    if (typeFilter === 'SNP') return { $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] };
  });
};

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

    const mutations = await Mutation.find({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      $or: mongooseTypeFilter,
    })
      .skip(parseInt(skip))
      .limit(50);

    if (!mutations) return res.send({ mutations: [], mutationsCount: 0 });

    // Have to convert string boolean to boolean
    const mutationsCount = await Mutation.countDocuments({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      $or: mongooseTypeFilter,
    });

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
    res.status(500).send(error);
  }
});

router.get('/geneNames', async (req: ExtendedRequest, res) => {
  const { projectId, searchInput } = req.query;

  try {
    if (!searchInput) return res.send([]);
    const mutations = await Mutation.find({ project: projectId, gene: RegExp(`^${searchInput}`, 'i') });
    if (!mutations) return res.send([]);

    const geneNames = uniq(mutations.map((mutation) => mutation.gene));
    const parsedGeneNames = geneNames.map((name) => ({ value: name, label: name }));

    res.send(parsedGeneNames);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/byGeneName', async (req: ExtendedRequest, res) => {
  const { projectId, geneName } = req.query;

  try {
    const mutations = await Mutation.find({ project: projectId, gene: geneName });

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
    res.status(500).send(error);
  }
});

router.get('/conditions', async (req: ExtendedRequest, res) => {
  const { projectId, gene, position } = req.query;

  try {
    const mutation = await Mutation.findOne({ project: projectId, gene, refPos: parseInt(position) });
    if (!mutation) return;

    // @ts-ignore
    const conditions = mutation.conditions.toJSON();
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
    const parsedFilters = JSON.parse(filters) as MutationFilters;

    const { inCDS, hasPeptideEvidence } = parsedFilters;

    const snps = await Mutation.countDocuments({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }],
    });

    const dels = await Mutation.countDocuments({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      alt: { $eq: '' },
    });

    const inss = await Mutation.countDocuments({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      ref: { $eq: '' },
    });

    res.send({ SNP: snps, DEL: dels, INS: inss });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;

// types: { SNP: snps, DEL: dels, INS: inss }