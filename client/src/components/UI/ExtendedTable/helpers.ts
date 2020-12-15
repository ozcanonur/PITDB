import { FilterTableBy } from './ExtendedTable';
import { isStringArray, isNumberTuple } from 'utils';

export const filterTable = (data: string[][], filterTableBy: FilterTableBy) => {
  for (const [, value] of Object.entries(filterTableBy)) {
    if (value === null) return data;
    if (typeof value === 'string') {
      // Filter was a single select
      data = [data.find((e) => value.includes(e[2])) || []];
    } else if (isStringArray(value)) {
      // multi select
      // @ts-ignore
      data = data.filter((e) => value.includes(e[0]));
    } else if (isNumberTuple(value)) {
      // slider
      const [min, max] = value;
      data = data.filter((e) => parseInt(e[5]) > min && parseInt(e[5]) < max);
    }
  }

  return data;
};
