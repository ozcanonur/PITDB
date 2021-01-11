import { ConditionsByGeneNameResponse } from 'components/Project/TranscriptUsage/ConfidenceIntervalChart/types';
import { SVGAttributes } from 'react';

export type ChartValue = {
  transcript: string;
  conditions: { conditionName: string; avg: number; ci: number }[];
};

export interface ConfidenceChartSvgProps extends SVGAttributes<SVGElement> {
  data: ConditionsByGeneNameResponse;
}

export interface ChartBaseProps {
  conditionNames: string[];
}
