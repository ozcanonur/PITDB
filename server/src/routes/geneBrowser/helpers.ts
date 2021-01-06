import { IAllTranscript } from 'db/models/allTranscript';

export const parseTranscriptsForViewer = (transcripts: IAllTranscript[]) => {
  let minimumPosition = Number.MAX_VALUE;
  let maximumPosition = 0;

  const parsedTranscripts = transcripts
    .map(({ transcriptID, start, end, exons, CDS }) => {
      if (start < minimumPosition) minimumPosition = start;
      if (end > maximumPosition) maximumPosition = end;

      return {
        transcriptId: transcriptID,
        exons: exons.map(([start, end]) => ({ start, end })),
        cds: CDS && Object.keys(CDS).length > 0 ? CDS[Object.keys(CDS)[0]] : null,
      };
    })
    .sort((x, y) => x.transcriptId.localeCompare(y.transcriptId));

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
