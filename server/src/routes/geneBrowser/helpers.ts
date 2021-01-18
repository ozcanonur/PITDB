import { IAllTranscript } from 'db/models/allTranscript';
import { IMutation } from 'db/models/mutation';
import flatten from 'flat';
import { mean } from 'lodash';
import { ParsedMutation } from './types';

export const parseMutations = (mutations: IMutation[]) => {
  const mutationTranscriptsPos: {
    [transcript: string]: { pos: number; aaRef?: string; aaAlt?: string };
  }[] = mutations.map((mutation) => mutation.transcriptsPos);

  const flatMutationTranscriptsPos: { [transcript: string]: any } = flatten(mutationTranscriptsPos, {
    maxDepth: 2,
  });

  const parsedMutations: ParsedMutation[] = [];

  Object.keys(flatMutationTranscriptsPos).forEach((transcript) => {
    const { pos, aaRef, aaAlt } = flatMutationTranscriptsPos[transcript];
    const parsedMutation = {
      // flatten creates keys like '1.ENST0000232' etc.
      transcript: transcript.split('.')[1],
      pos,
      aaRef,
      aaAlt,
    };
    parsedMutations.push(parsedMutation);
  });

  return parsedMutations;
};

export const parseTranscriptsForViewer = (
  transcripts: IAllTranscript[],
  parsedMutations: ParsedMutation[]
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
        (mutation) => mutation.transcript.replace('_', '.') === transcriptID
      );

      const parsedConditions = Object.entries(TPM).map(([condition, values]) => {
        const meanValue = mean(Object.values(values));
        return {
          condition,
          mean: meanValue,
        };
      });

      const parsedCds = Object.keys(CDS)
        .map((key) => CDS[key])
        .sort((x, y) => x.start - y.start);

      return {
        transcriptId: transcriptID,
        exons: exons.map(([start, end]) => ({ start, end })),
        cds: parsedCds,
        mutations,
        conditions: parsedConditions,
        seq,
        start,
        end,
      };
    })
    // WOOP, getting mean across all conditions here, PITGUI divides to Nsi/si but we don't
    .sort(
      (x, y) =>
        mean(y.conditions.map((condition) => condition.mean)) -
        mean(x.conditions.map((condition) => condition.mean))
    );

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
