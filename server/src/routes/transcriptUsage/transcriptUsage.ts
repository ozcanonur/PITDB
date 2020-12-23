import express from 'express';

import { ExtendedRequest } from '../../types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  try {
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
