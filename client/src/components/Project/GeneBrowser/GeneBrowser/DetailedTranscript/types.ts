import { SVGAttributes } from 'react';
import { TranscriptData } from '../types';

export interface DetailedTranscriptSvgProps extends SVGAttributes<SVGElement> {
  transcriptData: TranscriptData;
}
