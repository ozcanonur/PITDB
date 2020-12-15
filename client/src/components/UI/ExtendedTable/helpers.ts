import { FilterTableBy } from './ExtendedTable';
import { isStringArray, isNumberTuple } from 'utils';

export const filterTable = (data: string[][], filterTableBy: FilterTableBy) => {
  for (const [onIndex, value] of Object.entries(filterTableBy)) {
    const parsedOnIndex = parseInt(onIndex);

    if (value === null) continue;

    if (typeof value === 'string') {
      // Filter was a single select
      data = [data.find((e) => value.includes(e[parsedOnIndex])) || []];
    } else if (isStringArray(value)) {
      // multi select
      // @ts-ignore
      data = data.filter((e) => value.includes(e[parsedOnIndex]));
    } else if (isNumberTuple(value)) {
      // slider
      const [min, max] = value;
      data = data.filter((e) => parseInt(e[parsedOnIndex]) > min && parseInt(e[parsedOnIndex]) < max);
    }
  }

  return data;
};
