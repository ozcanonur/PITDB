import express from 'express';

import { Config } from '../../db/models/config';
import { ExtendedRequest } from '../../types';

const router = express.Router();

router.get('/condition-types', async (req: ExtendedRequest, res) => {
  const { project } = req.query;

  console.log(project);

  try {
    const projectConfig = await Config.findOne({ project });

    const conditionTypes = Object.keys(projectConfig.conditions);

    res.send(conditionTypes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
