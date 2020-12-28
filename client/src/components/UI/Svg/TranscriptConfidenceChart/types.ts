import { ConditionsByGeneNameResponse } from 'components/Project/TranscriptUsage/ConfidenceChart/types';
import { CSSProperties } from 'react';

export type ChartValue = {
  transcript: string;
  conditions: { conditionName: string; avg: number; ci: number }[];
};

export interface TranscriptConfidenceChartProps {
  style: CSSProperties;
  data: ConditionsByGeneNameResponse;
}
