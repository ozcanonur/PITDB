import { IAllTranscript } from 'db/models/allTranscript';
import { IMutation } from 'db/models/mutation';
import flatten from 'flat';
import { ParsedMutations } from './types';

export const parseMutations = (mutations: IMutation[]) => {
  const mutationTranscriptsPos: {
    [transcript: string]: { pos: number; aaRef?: string; aaAlt?: string };
  }[] = mutations.map((mutation) => mutation.transcriptsPos);

  const flatMutationTranscriptsPos = flatten(mutationTranscriptsPos, { maxDepth: 2 });

  const parsedMutations: ParsedMutations = [];

  Object.keys(flatMutationTranscriptsPos).forEach((transcript) => {
    // @ts-ignore
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
  parsedMutations: ParsedMutations
) => {
  let minimumPosition = Number.MAX_VALUE;
  let maximumPosition = 0;

  console.log(transcripts);

  const parsedTranscripts = transcripts
    .map(({ transcriptID, start, end, exons, CDS, TPM }) => {
      if (start < minimumPosition) minimumPosition = start;
      if (end > maximumPosition) maximumPosition = end;

      // Transcript IDs are in different format in mutations and allTranscripts
      // ENST0000053421_1 vs ENST0000053421.1
      const mutations = parsedMutations.filter(
        (mutation) => mutation.transcript.replace('_', '.') === transcriptID
      );

      return {
        transcriptId: transcriptID,
        exons: exons.map(([start, end]) => ({ start, end })),
        cds: CDS && Object.keys(CDS).length > 0 ? CDS[Object.keys(CDS)[0]] : null,
        mutations,
        conditions: Object.keys(TPM),
      };
    })
    .sort((x, y) => x.transcriptId.localeCompare(y.transcriptId));

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
