import express from 'express';

import { ExtendedRequest } from '../../types';
import { TranscriptUsageDPSI } from '../../db/models/transcriptUsageDPSI';
import { convertSortFieldNameForMongoose, parseTranscriptUsages, parseTranscriptsForViewer } from './helpers';
import { TranscriptUsageFilters, TranscriptUsagesWithTranscript } from './types';

const router = express.Router();

router.get('/', async (req: ExtendedRequest, res) => {
  const { project, skip, filters, sortedOn } = req.query;

  try {
    const { maxPValue } = JSON.parse(filters) as TranscriptUsageFilters;
    const { field, order } = JSON.parse(sortedOn) as { field: string; order?: -1 | 1 };

    const query = {
      project,
      pval: { $lt: maxPValue },
      // pepEvidence: { $in: hasPeptideEvidence.map((e) => e === 'true') },
    };

    const transcriptUsages = await TranscriptUsageDPSI.find(query)
      .sort({ [convertSortFieldNameForMongoose(field)]: order })
      .skip(parseInt(skip))
      .limit(50);

    if (!transcriptUsages) return res.send({ transcriptUsages: [], transcriptUsagesCount: 0 });

    const parsedTranscriptUsages = parseTranscriptUsages(transcriptUsages);

    const transcriptUsagesCount = await TranscriptUsageDPSI.countDocuments(query);

    res.send({ transcriptUsages: parsedTranscriptUsages, transcriptUsagesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/geneNames', async (req: ExtendedRequest, res) => {
  const { project, searchInput } = req.query;

  if (!searchInput) return res.send([]);

  try {
    const geneNames = await TranscriptUsageDPSI.aggregate([
      { $match: { project, geneName: RegExp(`^${searchInput}`, 'i') } },
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
  const { project, geneName } = req.query;

  try {
    const transcriptUsages = await TranscriptUsageDPSI.find({ project, geneName });
    if (!transcriptUsages) return res.send([]);

    const parsedTranscriptUsages = parseTranscriptUsages(transcriptUsages);

    res.send(parsedTranscriptUsages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/transcripts', async (req: ExtendedRequest, res) => {
  const { project, gene } = req.query;

  try {
    const transcriptUsages: TranscriptUsagesWithTranscript[] = await TranscriptUsageDPSI.aggregate([
      { $match: { project, geneName: gene } },
      {
        $lookup: {
          from: 'allTranscripts',
          localField: 'transcript',
          foreignField: 'transcriptID',
          as: 'transcripts',
        },
      },
    ]);

    const transcripts = transcriptUsages.map((transcriptUsage) => transcriptUsage.transcripts[0]);
    const parsedTranscripts = parseTranscriptsForViewer(transcripts);

    res.send(parsedTranscripts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
