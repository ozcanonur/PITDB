import { ConditionsByGeneNameResponse } from 'components/Project/TranscriptUsage/ConfidenceChart/types';
import { CSSProperties, SVGAttributes } from 'react';

export type ChartValue = {
  transcript: string;
  conditions: { conditionName: string; avg: number; ci: number }[];
};

export interface ConfidenceChartSvgProps extends SVGAttributes<SVGElement> {
  style: CSSProperties;
  data: ConditionsByGeneNameResponse;
}

export interface ChartBaseProps {
  conditionNames: string[];
}
