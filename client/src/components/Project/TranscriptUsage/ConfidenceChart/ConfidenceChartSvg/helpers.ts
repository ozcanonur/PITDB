import { ConditionsByGeneNameResponse } from 'components/Project/TranscriptUsage/ConfidenceChart/types';
import { ChartValue } from './types';
import { std } from 'mathjs';

const getAvg = (values: number[]) => values.reduce((prev, curr) => prev + curr) / values.length;

export const getCi = (values: number[]) => {
  const sd = std(values, 'biased');

  const ci = (1.96 * sd) / Math.sqrt(values.length);

  return ci;
};

export const getConditionNames = (data: ConditionsByGeneNameResponse) => {
  const transcripts = Object.keys(data);
  if (transcripts.length === 0) return [];

  const someTranscriptEntry = data[transcripts[0]];
  return Object.keys(someTranscriptEntry);
};

export const makeChartValues = (data: ConditionsByGeneNameResponse) => {
  const chartValues: ChartValue[] = [];

  // Find average and confidence interval ratios for each transcript + condition
  Object.keys(data).forEach((transcript) => {
    const value: ChartValue = { transcript, conditions: [] };

    Object.keys(data[transcript]).forEach((conditionName) => {
      const conditionValue: any = { conditionName, avg: 0, ci: 0 };

      const conditionAvg = getAvg(data[transcript][conditionName]);
      const conditionCi = getCi(data[transcript][conditionName]);
      conditionValue.avg = conditionAvg;
      conditionValue.ci = conditionCi;

      value.conditions.push(conditionValue);
    });

    chartValues.push(value);
  });

  return chartValues.sort((x, y) => x.transcript.localeCompare(y.transcript));
};
