import { max } from 'lodash';
import { BarChartData } from './types';

export const getValuesForCondition = (condition: {
  [sample: string]: string | number;
  condition: string;
}) => {
  const values: number[] = [];
  Object.keys(condition).forEach((sample) => {
    const value = condition[sample];
    // @ts-ignore
    if (!isNaN(value)) values.push(value);
  });

  return values;
};

export const getMaxCount = (barChartData: BarChartData) => {
  const values = barChartData.map((data) => getValuesForCondition(data)).flat();

  return max(values) as number;
};
