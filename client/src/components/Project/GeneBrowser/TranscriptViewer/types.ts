import { SVGAttributes } from 'react';

export type GeneNamesResponse = { _id: string }[];

type Transcript = {
  transcriptId: string;
  exons: { start: number; end: number }[];
  cds?: {
    sequence: string;
    strand: string;
    start: number;
    end: number;
    type: string;
  };
  mutations: {
    transcript: string;
    pos: number;
    aaRef?: string;
    aaAlt?: string;
  }[];
  conditions: string[];
};

export type TranscriptData = {
  transcript: Transcript;
  minimumPosition: number;
  maximumPosition: number;
};

export interface TranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: TranscriptData;
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
