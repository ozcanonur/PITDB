import { HTMLAttributes, SVGAttributes } from 'react';
import { ListChildComponentProps } from 'react-window';

export type GeneNamesResponse = { _id: string }[];

export type GeneBrowserFilters = {
  gene: string;
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
    values: { sample: string; TPM: number }[];
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

export type TranscriptsData = TranscriptsResponse;

export interface TranscriptProps extends SVGAttributes<SVGSVGElement> {
  transcript: Transcript;
  isTooltip?: boolean;
}

export interface DetailedTranscriptProps extends HTMLAttributes<HTMLDivElement> {
  transcript: Transcript;
}

export interface RegularScrollProps extends HTMLAttributes<HTMLDivElement> {
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  width: number;
}

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

export type RelativePeptidePosition = {
  start: number;
  end: number;
  mods: {
    type: string;
    posInPeptide: number;
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

export type RelativeModPositionAndType = {
  pos: number;
  type: string;
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
    relativePeptidePositions: RelativePeptidePosition[];
    relativeCdsPositionsAndSequences: RelativeCdsPositionAndSequence[];
  };
}

export interface DetailedModProps extends ListChildComponentProps {
  data: {
    relativeModPositionsAndTypes: RelativeModPositionAndType[];
  };
}
