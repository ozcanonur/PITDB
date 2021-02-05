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

export type RelativeExonPositionAndSequence = {
  sequence: string;
  start: number;
  end: number;
  length: number;
};

export type RelativeCdsPositionAndSequence = {
  start: number;
  end: number;
  sequence: string;
};

export type RelativePeptidePositionAndSequence = {
  start: number;
  end: number;
  mods: {
    type: string;
    pos: number;
  }[];
};

export type RelativeMutationPositionAndType = {
  start: number;
  end: number;
  type: string;
  ref: string;
  alt?: string;
  delLength?: number;
};

export interface DetailedNucleotideProps extends ListChildComponentProps {
  data: {
    relativeExonPositionsAndSequences: RelativeExonPositionAndSequence[];
    relativeMutationPositionsAndTypes: RelativeMutationPositionAndType[];
  };
}

export interface DetailedCdsProps extends ListChildComponentProps {
  data: {
    relativeCdsPositionsAndSequences: RelativeCdsPositionAndSequence[];
    cdsStart: number;
    cdsEnd: number;
  };
}

export interface DetailedPeptideProps extends ListChildComponentProps {
  data: {
    relativePeptidePositionsAndSequences: RelativePeptidePositionAndSequence[];
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

export interface DetailedTranscriptsVirtualListProps {
  transcripts: Transcript[];
  minimumPosition: number;
  maximumPosition: number;
  virtualizedListRefsList: {
    exonRef: VirtualRef;
    cdsRefs?: VirtualRef[][] | undefined;
  }[];
}
