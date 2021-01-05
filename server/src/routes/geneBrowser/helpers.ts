import { IAllTranscript } from 'db/models/allTranscript';

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
