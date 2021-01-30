import { HTMLAttributes, SVGAttributes } from 'react';
import { FixedSizeList } from 'react-window';

export type GeneNamesResponse = { _id: string }[];

export type GeneBrowserFilters = {
  gene: string;
  condition: string;
  minTPM: number;
  minQual: number;
};

export type Transcript = {
  transcriptId: string;
  exons: { genomeStart: number; genomeEnd: number }[];
  cds?: {
    sequence: string;
    strand: string;
    start: number;
    end: number;
    type: string;
    peptides: {
      sequence: string;
      mod: string;
    }[];
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
  seq: string;
  start: number;
  end: number;
};

export type TranscriptsResponse = {
  transcripts: Transcript[];
  minimumPosition: number;
  maximumPosition: number;
};

export type TranscriptData = {
  transcript: Transcript;
  minimumPosition: number;
  maximumPosition: number;
};

export interface TranscriptProps extends SVGAttributes<SVGElement> {
  transcriptData: TranscriptData;
}

export interface DetailedTranscriptProps extends HTMLAttributes<HTMLDivElement> {
  transcriptData: TranscriptData;
  refs: { exonRef: VirtualRef; cdsRefs?: VirtualRef[][] };
}

export type VirtualRef = React.RefObject<FixedSizeList>;
