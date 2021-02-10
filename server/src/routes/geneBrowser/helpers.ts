import { mean } from 'lodash';
// @ts-ignore
import replaceall from 'replaceall';

import { IAllTranscript } from 'db/models/allTranscript';
import { IMutation } from 'db/models/mutation';
import { ParsedMutation } from './types';

export const parseMutations = (mutations: IMutation[], minQual: number) => {
  const parsedMutations: {
    transcript: string;
    refPos: number;
    aaRef: string;
    aaAlt: string;
    type: string;
  }[] = [];

  for (const { refPos, transcriptsPos, type, ref, alt, conditions } of mutations) {
    const mutationQualities = Object.values(conditions)
      .map((e) => Object.values(e))
      .flat()
      // @ts-ignore
      .map((e) => e.qual);

    // If at least one sample's mutation quality is higher than the min. qual filter
    // WOOP, do we want to check mean instead?
    if (mutationQualities.some((e) => e >= minQual)) {
      Object.keys(transcriptsPos).forEach((transcript) => {
        const { aaRef, aaAlt } = transcriptsPos[transcript];

        const parsedMutation = {
          transcript,
          refPos,
          aaRef,
          aaAlt,
          type,
          ref,
          alt,
        };
        parsedMutations.push(parsedMutation);
      });
    }
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
            values: Object.keys(values).map((sample) => ({ sample, TPM: values[sample] })),
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
    // Sort by abundance
    .sort(
      ({ conditions: x }, { conditions: y }) =>
        mean(y.map(({ mean }) => mean)) - mean(x.map(({ mean }) => mean))
    );

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
