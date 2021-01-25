import { SVGAttributes } from 'react';
import { TranscriptData } from '../types';

export interface TranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: TranscriptData;
  showTranscriptLabels: boolean;
}
