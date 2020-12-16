import { at } from 'lodash';

import { FilterTableBy, Filter } from './ExtendedTable';
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

export const getInitialFilterValues = (filters?: Filter[]) => {
  const initialFilterValues: GenericObject = {};

  if (!filters) return initialFilterValues;

  for (const { options, onIndex, defaultValueIndexes, defaultValues } of filters) {
    // It's a multi select
    if (options && defaultValueIndexes)
      initialFilterValues[onIndex] = at(options, defaultValueIndexes).map((e) => e.value);
    // Slider
    else if (defaultValues) initialFilterValues[onIndex] = defaultValues;
  }

  return initialFilterValues;
};
