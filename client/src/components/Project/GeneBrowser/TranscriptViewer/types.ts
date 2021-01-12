export type GeneNamesResponse = { _id: string }[];

export type Transcript = {
  transcriptId: string;
  exons: { start: number; end: number }[];
  cds?: {
    sequence: string;
    strand: string;
    start: number;
    end: number;
    type: string;
  }[];
  mutations: {
    transcript: string;
    pos: number;
    aaRef?: string;
    aaAlt?: string;
  }[];
  conditions: {
    condition: string;
    mean: number;
  }[];
};

export type TranscriptData = {
  transcript: Transcript;
  minimumPosition: number;
  maximumPosition: number;
};

export type TranscriptsResponse = {
  transcripts: Transcript[];
  minimumPosition: number;
  maximumPosition: number;
};

export type GeneBrowserFilters = {
  gene: string;
  conditions: string[];
  minTPM: number;
  minQual: number;
};
