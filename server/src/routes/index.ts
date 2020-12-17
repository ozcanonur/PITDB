import express from 'express';

import { Mutation } from '../db/models/mutations';

const router = express.Router();

router.get('/mutations', async (req, res) => {
  try {
    const someMutations = await Mutation.findOne({ chr: 'chr1' });
    if (someMutations) return res.send(someMutations);
    res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
