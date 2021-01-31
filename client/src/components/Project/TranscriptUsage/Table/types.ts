export type TranscriptUsageTableFilters = {
  gene: string;
  maxPValue: number;
};

export type TranscriptUsagesResponse = {
  transcriptUsages: {
    geneName: string;
    transcript: string;
    deltaPsi: string;
    pval: number;
    hasPeptideEvidence: boolean;
  }[];
  transcriptUsagesCount: number;
};

export type TranscriptUsageGeneNamesResponse = { _id: string }[];
