import { SVGAttributes } from 'react';

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
