import express, { Request } from 'express';

import { Mutation } from '../db/models/mutation';

const router = express.Router();

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

router.get('/mutations', async (req: ExtendedRequest, res) => {
  const { projectId, skip } = req.query;

  try {
    const mutations = await Mutation.find({ project: projectId }).skip(parseInt(skip)).limit(50);
    if (mutations) {
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
      return res.send(parsedMutations);
    }
    res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/mutationsCount', async (req: ExtendedRequest, res) => {
  const { projectId } = req.query;

  try {
    const mutationsCount = await Mutation.countDocuments({ project: projectId });
    if (mutationsCount) return res.send(mutationsCount.toString());

    res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
