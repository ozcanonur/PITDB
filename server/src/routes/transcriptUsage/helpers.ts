import numeral from 'numeral';

import { ITranscriptUsageDPSI } from '../../db/models/transcriptUsageDPSI';

export const convertSortFieldNameForMongoose = (field: string) => {
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

    const formattedDeltaPsi = numeral(deltaPsi).format('0.000e+0');
    const formattedPVal = numeral(pval).format('0.000e+0');

    // WOOP, hard coding peptide evidence
    return {
      geneName,
      transcript,
      deltaPsi: formattedDeltaPsi,
      pval: formattedPVal,
      hasPeptideEvidence: false,
    };
  });

  return parsedTranscriptUsages;
};
