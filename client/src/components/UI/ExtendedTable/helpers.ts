import uniqBy from 'lodash/uniqBy';

import { FilterTableBy, Filter } from './types';
import { isStringArray, isNumberTuple } from 'utils';

export const filterTable = (data: string[][], filterTableBy: FilterTableBy) => {
  for (const [onIndex, value] of Object.entries(filterTableBy)) {
    const parsedOnIndex = parseInt(onIndex);

    if (value === null) continue;

    if (isStringArray(value)) {
      // is multi select
      // @ts-ignore
      data = data.filter((e) => value.includes(e[parsedOnIndex]));
    } else if (isNumberTuple(value)) {
      // is slider
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
    const { type, onIndex, defaultValues, options } = filter;

    if (type === 'SingleSelect') {
      if (!options) {
        const options = initialTableData.map((row) => ({ value: row[onIndex], label: row[onIndex] }));
        filter.options = uniqBy(options, 'value');
      }
    } else if (type === 'MultiSelect') {
      if (!defaultValues) continue;
      if (!options) {
        // Add ordinal options
        const options = initialTableData.map((row) => ({ value: row[filter.onIndex], label: row[filter.onIndex] }));
        filter.options = uniqBy(options, 'value');
      }
      initialFilterValues[onIndex] = defaultValues;
      // at(options, defaultValueIndexes).map((e) => e.value);
    } else if (type === 'RangeSlider') initialFilterValues[onIndex] = defaultValues;
  }

  return initialFilterValues;
};
