import express, { Request } from 'express';

import { Mutation } from '../db/models/mutation';

const router = express.Router();

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

interface MutationFilters {
  type: string[];
  inCDS: boolean[];
  hasPeptideEvidence: boolean[];
}

router.get('/mutations', async (req: ExtendedRequest, res) => {
  const { projectId, onlyCount, skip, filters } = req.query;

  const parsedFilters = JSON.parse(filters) as MutationFilters;

  for (const key of Object.keys(parsedFilters)) {
    // @ts-ignore
    if (parsedFilters[key].length === 0) return res.send([]);
  }

  const { type: typeFilters, inCDS, hasPeptideEvidence } = parsedFilters;

  const mongooseTypeFilter = typeFilters.map((typeFilter) => {
    if (typeFilter === 'INS') return { $and: [{ ref: '' }, { alt: { $ne: '' } }] };
    if (typeFilter === 'DEL') return { $and: [{ alt: '' }, { ref: { $ne: '' } }] };
    if (typeFilter === 'SNP') return { $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] };
  });

  const query = {
    project: projectId,
    hasPeptideEvidence: { $in: hasPeptideEvidence },
    inCDS: { $in: inCDS },
    $or: mongooseTypeFilter,
  };

  try {
    if (onlyCount) {
      const mutationsCount = await Mutation.countDocuments(query);
      return res.send(mutationsCount.toString());
    }

    const mutations = await Mutation.find(query).skip(parseInt(skip)).limit(50);

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
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
