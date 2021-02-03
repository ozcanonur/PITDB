import { mean } from 'lodash';
// @ts-ignore
import replaceall from 'replaceall';

import { IAllTranscript } from 'db/models/allTranscript';
import { IMutation } from 'db/models/mutation';
import { ParsedMutation } from './types';

export const parseMutations = (mutations: IMutation[]) => {
  const parsedMutations: {
    transcript: string;
    refPos: number;
    aaRef: string;
    aaAlt: string;
    type: string;
  }[] = [];

  for (const mutation of mutations) {
    const { refPos } = mutation;
    Object.keys(mutation.transcriptsPos).forEach((transcript) => {
      const { aaRef, aaAlt } = mutation.transcriptsPos[transcript];

      const parsedMutation = {
        transcript,
        refPos,
        aaRef,
        aaAlt,
        type: mutation.type,
        ref: mutation.ref,
        alt: mutation.alt,
      };
      parsedMutations.push(parsedMutation);
    });
  }

  return parsedMutations;
};

export const parseTranscriptsForViewer = (
  transcripts: IAllTranscript[],
  parsedMutations: ParsedMutation[],
  condition: string
) => {
  let minimumPosition = Number.MAX_VALUE;
  let maximumPosition = 0;

  const parsedTranscripts = transcripts
    .map(({ transcriptID, start, end, exons, CDS, TPM, seq }) => {
      if (start < minimumPosition) minimumPosition = start;
      if (end > maximumPosition) maximumPosition = end;

      // Transcript IDs are in different format in mutations and allTranscripts
      // ENST0000053421_1 vs ENST0000053421.1
      const mutations = parsedMutations.filter(
        (mutation) => replaceall('_', '.', mutation.transcript) === transcriptID
      );

      const parsedConditions = Object.entries(TPM)
        .filter(([thisCondition]) => thisCondition === condition)
        .map(([condition, values]) => {
          const meanValue = mean(Object.values(values));
          return {
            condition,
            mean: meanValue,
          };
        });

      const parsedCds = CDS
        ? Object.keys(CDS)
            .map((key) => CDS[key])
            .sort((x, y) => x.start - y.start)
        : [];

      return {
        transcriptId: transcriptID,
        exons: exons.map(([start, end]) => ({ genomeStart: start, genomeEnd: end })),
        cds: parsedCds,
        mutations,
        conditions: parsedConditions,
        seq,
        start,
        end,
      };
    })
    .sort(
      (x, y) =>
        mean(y.conditions.map((condition) => condition.mean)) -
        mean(x.conditions.map((condition) => condition.mean))
    );

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
