import { HTMLAttributes, SVGAttributes } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

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

export interface RegularScrollProps extends HTMLAttributes<HTMLDivElement> {
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  width: number;
}

export interface DetailedTranscriptProps extends HTMLAttributes<HTMLDivElement> {
  transcriptData: TranscriptData;
  refs: { exonRef: VirtualRef; cdsRefs?: VirtualRef[][] };
}

export type VirtualRef = React.RefObject<FixedSizeList>;

export type RelativeExonPositionsAndSequences = {
  sequence: string;
  start: number;
  end: number;
  length: number;
}[];

export type RelativeCdsPositionsAndSequences = {
  start: number;
  end: number;
  sequence: string;
}[];

export type RelativePeptidePositionsAndSequences = {
  start: number;
  end: number;
  mods: {
    type: string;
    pos: number;
  }[];
}[];

export interface VirtualListChildComponentProps extends ListChildComponentProps {
  renderedRange?: { start: number; stop: number };
  scrollDirection?: 'forward' | 'backward';
}
