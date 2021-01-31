import express from 'express';

import { SplicingDPSI } from '../../db/models/splicingDPSI';
import { ExtendedRequest } from '../../types';
import { SplicingEventsFilters, SplicingDPSIWithConditions } from './types';
import { findMongoFieldFromTableColumn, parseSplicingEvents, parseConditions } from './helpers';

const router = express.Router();

/*
 * Route for splicing events table data
 * Filters by project, max p value, min absolute fold change
 * Sorts if sortedOn passed in request
 * Response is limited to 50 rows per request
 */
router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const { gene, maxPValue } = JSON.parse(filters) as SplicingEventsFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    let query = {
      project,
      pval: { $lt: maxPValue },
    };

    if (gene)
      // @ts-ignore
      query = { ...query, geneName: gene };

    const splicingEvents = await SplicingDPSI.find(query)
      .sort({ [findMongoFieldFromTableColumn(field)]: order })
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

/*
 * Route for splicing events single select choices
 * Filters by project, and finds gene names that start with the searchInput
 * Groups by gene names to get a unique list
 */
router.get('/gene-names', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames: { _id: string }[] = await SplicingDPSI.aggregate([
      { $match: { project, geneName: RegExp(`^${searchInput}`, 'i') } },
      { $group: { _id: '$geneName' } },
      { $limit: 20 },
    ]);

    res.send(geneNames);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/*
 * Route for getting event type distribution data for splicing events pie chart
 * Filters by project and given filters
 */
router.get('/types', async (req: ExtendedRequest, res) => {
  const { project, filters } = req.query;

  try {
    const { maxPValue } = JSON.parse(filters) as SplicingEventsFilters;

    const counts: { _id: string; count: number }[] = await SplicingDPSI.aggregate([
      {
        $match: {
          project,
          pval: { $lt: maxPValue },
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

/*
 * Route for getting conditions data for splicing events bar chart
 * Filters by project, gene and dPSI (gene + dPSI is the unique identifier)
 */
router.get('/conditions', async (req: ExtendedRequest, res) => {
  const { project, gene, dPSI } = req.query;

  try {
    const splicingPsi: SplicingDPSIWithConditions[] = await SplicingDPSI.aggregate([
      { $match: { project, geneName: gene, deltaPsi: parseFloat(dPSI) } },
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

/*
 * Route for getting splicing events event viewer data
 * Filters by project, gene and dPSI (gene + dPSI is the unique identifier)
 */
router.get('/event', async (req: ExtendedRequest, res) => {
  const { project, gene, dPSI } = req.query;

  try {
    const { event, eventType } = await SplicingDPSI.findOne({
      project,
      geneName: gene,
      deltaPsi: parseFloat(dPSI),
    });

    const [, chr, leftPositions, rightPositions, direction] = event.split(':');

    res.send({
      eventType,
      chr,
      positions: [...leftPositions.split('-'), ...rightPositions.split('-')],
      direction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
