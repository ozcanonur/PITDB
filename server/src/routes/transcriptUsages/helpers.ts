import { IAllTranscript } from 'db/models/allTranscript';

import { ITranscriptUsage } from '../../db/models/transcriptUsage';
import { ConditionsByGeneName } from './types';

export const findMongoFieldFromTableColumn = (field: string) => {
  if (field === 'Gene') return 'geneName';
  else if (field === 'Transcript') return 'transcript';
  else if (field === 'dPSI') return 'deltaPsi';
  else if (field === 'Adj. p value') return 'pval';
};

export const parseTranscriptsForViewer = (transcripts: IAllTranscript[]) => {
  let minimumPosition = Number.MAX_VALUE;
  let maximumPosition = 0;

  const parsedTranscripts = transcripts
    .map((transcript) => {
      if (transcript.start < minimumPosition) minimumPosition = transcript.start;
      if (transcript.end > maximumPosition) maximumPosition = transcript.end;

      return {
        transcriptId: transcript.transcriptID,
        exons: transcript.exons.map(([start, end]) => ({ start, end })),
      };
    })
    .sort((x, y) => x.transcriptId.localeCompare(y.transcriptId));

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};

export const parseConditionsByGeneName = (transcriptUsages: ITranscriptUsage[]) => {
  const conditionsByGeneName: ConditionsByGeneName = {};

  transcriptUsages.forEach((transcriptUsage) => {
    const { transcript, psi } = transcriptUsage;

    Object.keys(psi).forEach((condition) => {
      const conditionName = condition.split('_')[0];

      if (!conditionsByGeneName[transcript]) conditionsByGeneName[transcript] = {};
      if (!conditionsByGeneName[transcript][conditionName])
        conditionsByGeneName[transcript][conditionName] = [];

      conditionsByGeneName[transcript][conditionName].push(psi[condition]);
    });
  });

  return conditionsByGeneName;
};

export const parseReadCounts = (conditions: { [condition: string]: number }) => {
  const parsedConditions: { [sample: string]: number | string; condition: string }[] = [];
  for (const field of Object.keys(conditions)) {
    const [conditionName, sample] = field.split('/');

    const existingEntry = parsedConditions.find((entry) => entry.condition === conditionName);
    if (!existingEntry) {
      // @ts-ignore
      const newEntry = { condition: conditionName, [sample]: conditions[field] };
      parsedConditions.push(newEntry);
    }
    // @ts-ignore
    else existingEntry[sample] = conditions[field];
  }

  return parsedConditions;
};
