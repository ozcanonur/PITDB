export interface TranscriptUsageTableFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
}

export type Transcripts = {
  transcripts: {
    transcriptId: string;
    exons?: { start: number; end: number }[];
  }[];
  minimumPosition: number;
  maximumPosition: number;
};

export interface TranscriptReadCount {
  transcriptId: string;
  conditions: {
    condition: string;
    [sample: string]: number | string;
  }[];
}
