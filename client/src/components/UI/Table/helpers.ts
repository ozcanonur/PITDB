import range from 'lodash/range';

export const sortTableData = (data: string[][], sortByIndex: number = 0, sortingOrder: 1 | -1 = -1) => {
  if (!data) return [];

  const sortedData = data.sort((x, y) => {
    const firstValue = x[sortByIndex];
    const secondValue = y[sortByIndex];

    const convertedFirstValue = isNaN(firstValue as any) ? firstValue : parseFloat(firstValue);
    const convertedSecondValue = isNaN(secondValue as any) ? secondValue : parseFloat(secondValue);

    return convertedFirstValue < convertedSecondValue ? sortingOrder : sortingOrder * -1;
  });

  return sortedData;
};

// Currently displayed values, filtered by the search field
// 0 if it's not sorted, -1 if ascending, 1 if ascending
export const createSortState = (tableHead: string[]) => {
  const newSortState: { [key: string]: -1 | 0 | 1 } = {};

  // First column is always sorted at the start
  newSortState[0] = -1;
  range(1, tableHead.length).forEach((e) => {
    newSortState[e] = 0;
  });

  return newSortState;
};
