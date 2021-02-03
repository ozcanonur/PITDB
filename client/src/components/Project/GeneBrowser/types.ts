import { CSSProperties, HTMLAttributes, SVGAttributes } from 'react';
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
    refPos: number;
    aaRef?: string;
    aaAlt?: string;
    type: string;
    ref: string;
    alt: string;
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
  isTooltip?: boolean;
}

export interface RegularScrollProps extends HTMLAttributes<HTMLDivElement> {
  transcriptsData: TranscriptsResponse;
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  width: number;
  tooltipStyles?: CSSProperties;
  scrollStyles?: CSSProperties;
  tooltipPortalTo?: string;
  hasTooltip?: boolean;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  transcriptsData: TranscriptsResponse;
  portalTo?: string;
  tooltipStyles?: CSSProperties;
  tooltipOpen: boolean;
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

export type RelativeMutationPositionsAndTypes = {
  pos: number;
  type: string;
  ref: string;
  alt: string;
  isGroupStart: boolean;
  isGroupEnd: boolean;
}[];

export interface DetailedNucleotideProps extends ListChildComponentProps {
  data: {
    relativeExonPositionsAndSequences: RelativeExonPositionsAndSequences;
    relativeMutationPositionsAndTypes: RelativeMutationPositionsAndTypes;
  };
}

export interface DetailedCdsProps extends ListChildComponentProps {
  data: {
    relativeCdsPositionsAndSequences: RelativeCdsPositionsAndSequences;
    cdsStart: number;
    cdsEnd: number;
  };
}

export interface DetailedPeptideProps extends ListChildComponentProps {
  data: {
    relativePeptidePositionsAndSequences: RelativePeptidePositionsAndSequences;
  };
}

export type DetailedTranscriptsVirtualListsProps = {
  transcripts: Transcript[];
  minimumPosition: number;
  maximumPosition: number;
  refs: {
    exonRef: VirtualRef;
    cdsRefs?: VirtualRef[][];
  }[];
};

export interface PositionLineProps extends HTMLAttributes<HTMLDivElement> {
  minimumPosition: number;
  maximumPosition: number;
}

// export interface VirtualListChildComponentProps extends ListChildComponentProps {
//   renderedRange?: { start: number; stop: number };
//   scrollDirection?: 'forward' | 'backward';
// }
