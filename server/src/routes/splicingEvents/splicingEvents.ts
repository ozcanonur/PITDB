import express from 'express';

import { SplicingDPSI } from '../../db/models/splicingDPSI';
import { ExtendedRequest, SplicingEventsFilters } from './types';
import { convertSortFieldNameForMongoose, parseSplicingEvents, parseConditions } from './helpers';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { projectId, skip, filters, sortedOn } = req.query;

  try {
    const { maxPValue, hasPeptideEvidence } = JSON.parse(filters) as SplicingEventsFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    const query = {
      project: projectId,
      pval: { $lt: maxPValue },
      pepEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
    };

    const splicingEvents = await SplicingDPSI.find(query)
      .sort({ [convertSortFieldNameForMongoose(field)]: order })
      .skip(parseInt(skip))
      .limit(50);

    if (!splicingEvents) return res.send({ splicingEvents: [], splicingEventsCount: 0 });

    const parsedSplicingEvents = parseSplicingEvents(splicingEvents);

    const splicingEventsCount = await SplicingDPSI.countDocuments(query);

    res.send({ splicingEvents: parsedSplicingEvents, splicingEventsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/geneNames', async (req: ExtendedRequest, res) => {
  const { projectId, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames = await SplicingDPSI.aggregate([
      { $match: { project: projectId, geneName: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$geneName' } },
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

router.get('/byGeneName', async (req: ExtendedRequest, res) => {
  const { projectId, geneName } = req.query;

  try {
    const splicingEvents = await SplicingDPSI.find({ project: projectId, geneName });
    if (!splicingEvents) return res.send([]);

    const parsedSplicingEvents = parseSplicingEvents(splicingEvents);

    res.send(parsedSplicingEvents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/types', async (req: ExtendedRequest, res) => {
  const { projectId, filters } = req.query;

  try {
    const { maxPValue, hasPeptideEvidence } = JSON.parse(filters) as SplicingEventsFilters;

    const counts: { _id: string; count: number }[] = await SplicingDPSI.aggregate([
      {
        $match: {
          project: projectId,
          pval: { $lt: maxPValue },
          pepEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
        },
      },
      {
        $group: { _id: '$eventType', count: { $sum: 1 } },
      },
    ]);

    const parsedCounts: { [eventType: string]: number } = {};
    counts.forEach((count) => {
      parsedCounts[count._id] = count.count;
    });

    res.send(parsedCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/conditions', async (req: ExtendedRequest, res) => {
  const { projectId, gene, dPSI } = req.query;

  console.log(gene, dPSI);

  try {
    const splicingPsi = await SplicingDPSI.aggregate([
      { $match: { project: projectId, geneName: gene, deltaPsi: parseFloat(dPSI) } },
      { $lookup: { from: 'SplicingPsi', localField: 'event', foreignField: 'event', as: 'conditions' } },
    ]);

    // Getting the first element since there are duplicates?
    const parsedConditions = parseConditions(splicingPsi[0].conditions[0]);

    res.send(parsedConditions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
