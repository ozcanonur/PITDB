import { SVGAttributes } from 'react';

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
  };
};

export interface TranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: {
    transcript: Transcript;
    minimumPosition: number;
    maximumPosition: number;
  };
}

export type TranscriptsResponse = {
  transcripts: Transcript[];
  minimumPosition: number;
  maximumPosition: number;
};

export type GeneBrowserFilters = {
  conditions: string[];
  minTPM: number;
  minQual: number;
};
