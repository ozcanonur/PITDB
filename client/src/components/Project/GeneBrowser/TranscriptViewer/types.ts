import { SVGAttributes } from 'react';

export type GeneNamesResponse = { _id: string }[];

export interface TranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: {
    transcript: {
      transcriptId: string;
      exons?: { start: number; end: number }[];
    };
    minimumPosition: number;
    maximumPosition: number;
  };
}

export type TranscriptsResponse = {
  transcripts: {
    transcriptId: string;
    exons?: { start: number; end: number }[];
  }[];
  minimumPosition: number;
  maximumPosition: number;
};

export type GeneBrowserFilters = {
  conditions: string[];
  minTPM: number;
  minQual: number;
};
