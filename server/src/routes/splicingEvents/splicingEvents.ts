import express from 'express';

import { SplicingEvent } from '../../db/models/splicingEvent';
import { ExtendedRequest } from './types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { projectId, skip } = req.query;

  try {
    // const splicingEvents = await SplicingEvent.find().skip(parseInt(skip)).limit(50);
    // if (!splicingEvents) return res.send({ splicingEvents: [], splicingEventsCount: 0 });
    // const dgesCount = await SplicingEvent.countDocuments();
    // // WOOP, hard coding peptide evidence
    // const parsedDges = dges.map((dge) => {
    //   const { symbol, log2fc, padj } = dge;
    //   const formattedlog2fc = numeral(log2fc).format('0.000');
    //   const formattedpadj = numeral(padj).format('0.000e+0');
    //   return {
    //     symbol,
    //     log2fc: formattedlog2fc,
    //     padj: formattedpadj,
    //     hasPeptideEvidence: false,
    //   };
    // });
    // res.send({ dges: parsedDges, dgesCount });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

export default router;
