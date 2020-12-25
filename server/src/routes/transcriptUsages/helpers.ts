import { IAllTranscript } from 'db/models/allTranscript';

import { ITranscriptUsageDPSI } from '../../db/models/transcriptUsageDPSI';

export const findMongoFieldFromTableColumn = (field: string) => {
  if (field === 'Gene') return 'geneName';
  else if (field === 'Transcript') return 'transcript';
  else if (field === 'dPSI') return 'deltaPsi';
  else if (field === 'P value') return 'pval';
  // WOOP, change peptide evidence sort column value
  else if (field === 'Peptide evidence') return 'geneName';
};

export const parseTranscriptUsages = (transcriptUsages: ITranscriptUsageDPSI[]) => {
  const parsedTranscriptUsages = transcriptUsages.map((transcriptUsage) => {
    const { geneName, transcript, deltaPsi, pval } = transcriptUsage;

    // const formattedDeltaPsi = numeral(deltaPsi).format('0.000e+0');
    // const formattedPVal = numeral(pval).format('0.000e+0');

    // WOOP, hard coding peptide evidence
    return {
      geneName,
      transcript,
      deltaPsi,
      pval,
      hasPeptideEvidence: false,
    };
  });

  return parsedTranscriptUsages;
};

export const parseTranscriptsForViewer = (transcripts: IAllTranscript[]) => {
  let minimumPosition = Number.MAX_VALUE;
  let maximumPosition = 0;

  const parsedTranscripts = transcripts.map((transcript) => {
    if (transcript.start < minimumPosition) minimumPosition = transcript.start;
    if (transcript.end > maximumPosition) maximumPosition = transcript.end;

    return {
      transcriptId: transcript.transcriptID,
      exons: transcript.exons.map(([start, end]) => ({ start, end })),
    };
  });

  return { transcripts: parsedTranscripts, minimumPosition, maximumPosition };
};
