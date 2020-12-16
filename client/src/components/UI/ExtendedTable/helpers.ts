import { at, uniqBy } from 'lodash';

import { FilterTableBy, Filter } from './types';
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

export const getInitialFilterValues = (initialTableData: string[][], filters?: Filter[]) => {
  if (!filters) return {};

  const initialFilterValues: GenericObject = {};

  for (const filter of filters) {
    const { type, onIndex, defaultValueIndexes, defaultValues } = filter;

    if (type === 'SingleSelect') {
      const options = initialTableData.map((row) => ({ value: row[onIndex], label: row[onIndex] }));
      filter.options = uniqBy(options, 'value');
    } else if (type === 'MultiSelect') {
      if (!defaultValueIndexes) continue;
      // Add ordinal options
      const options = initialTableData.map((row) => ({ value: row[filter.onIndex], label: row[filter.onIndex] }));
      filter.options = uniqBy(options, 'value');

      initialFilterValues[onIndex] = at(options, defaultValueIndexes).map((e) => e.value);
    } else if (type === 'RangeSlider') initialFilterValues[onIndex] = defaultValues;
  }

  return initialFilterValues;
};
