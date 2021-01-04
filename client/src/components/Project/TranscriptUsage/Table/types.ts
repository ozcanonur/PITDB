export type TranscriptUsageTableFilters = {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
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

export type TranscriptUsageByGeneNameResponse = {
  geneName: string;
  transcript: string;
  deltaPsi: string;
  pval: number;
  hasPeptideEvidence: boolean;
}[];
