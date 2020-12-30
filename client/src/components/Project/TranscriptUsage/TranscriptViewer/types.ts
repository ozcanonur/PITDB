import { SVGAttributes } from 'react';

export type TranscriptsResponse = {
  transcripts: {
    transcriptId: string;
    exons?: { start: number; end: number }[];
  }[];
  minimumPosition: number;
  maximumPosition: number;
};

export interface TranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: {
    transcript: {
      transcriptId: string;
      exons?: { start: number; end: number }[];
    };
    minimumPosition: number;
    maximumPosition: number;
  };
  color: string;
}
