import { FilterTableBy } from './ExtendedTable';
import { isStringArray } from 'utils';

export const filterTable = (tableData: string[][], filterTableBy: FilterTableBy) => {
  let filteredTableData = tableData;
  Object.keys(filterTableBy).forEach((filterName) => {
    const currentFilters = filterTableBy[filterName];
    // If it's a ordinal string filter for multi select
    if (isStringArray(currentFilters) && filterName === 'Experiment Accession') {
      // @ts-ignore
      filteredTableData = [filteredTableData.find((e) => currentFilters.includes(e[2])) || []];
    } else if (isStringArray(currentFilters)) {
      // @ts-ignore
      filteredTableData = filteredTableData.filter((e) => currentFilters.includes(e[0]));
    } else {
      // If it's a number slider filter
      const [min, max] = currentFilters;
      filteredTableData = filteredTableData.filter((e) => parseInt(e[5]) > min && parseInt(e[5]) < max);
    }
  });

  return filteredTableData;
};
