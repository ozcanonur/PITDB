import express from 'express';
import { uniq } from 'lodash';

import { Mutation } from '../../db/models/mutation';
import { ExtendedRequest, MutationFilters } from './types';

const router = express.Router();

const parseTypeFiltersForMongoose = (typeFilters: [string?, string?, string?]) => {
  return typeFilters.map((typeFilter) => {
    if (typeFilter === 'INS') return { ref: '' };
    if (typeFilter === 'DEL') return { alt: '' };
    if (typeFilter === 'SNP') return { $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] };
  });
};

router.get('/mutations/count', async (req: ExtendedRequest, res) => {
  const { projectId, filters } = req.query;

  try {
    const parsedFilters = JSON.parse(filters) as MutationFilters;

    for (const key of Object.keys(parsedFilters)) {
      // @ts-ignore
      if (parsedFilters[key].length === 0) return res.send([]);
    }

    const { type: typeFilters, inCDS, hasPeptideEvidence } = parsedFilters;

    const mongooseTypeFilter = parseTypeFiltersForMongoose(typeFilters);

    // Have to convert string boolean to boolean
    const mutationsCount = await Mutation.countDocuments({
      project: projectId,
      hasPeptideEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
      inCDS: { $in: inCDS.map((e) => e === 'true') },
      $or: mongooseTypeFilter,
    });

    res.send(mutationsCount.toString());
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/mutations', async (req: ExtendedRequest, res) => {
  const { projectId, skip, filters } = req.query;

  try {
    const parsedFilters = JSON.parse(filters) as MutationFilters;

    for (const key of Object.keys(parsedFilters)) {
      // @ts-ignore
      if (parsedFilters[key].length === 0) return res.send([]);
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

router.get('/mutations/geneNames', async (req: ExtendedRequest, res) => {
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

router.get('/mutations/byGeneName/count', async (req: ExtendedRequest, res) => {
  const { projectId, geneName } = req.query;

  try {
    // Have to convert string boolean to boolean
    const mutationsCount = await Mutation.countDocuments({
      project: projectId,
      gene: geneName,
    });

    res.send(mutationsCount.toString());
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/mutations/byGeneName', async (req: ExtendedRequest, res) => {
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

export default router;
