import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { sampleTableData } from 'variables/browseTableData';

import { mountTable, applyThousandsSeperator, getTableCells, getTableRows } from './helpers';

const wrapped = mountTable();

it('renders the data correctly', () => {
  // Iterate through all cells and check against the given data
  // Exclude table head row
  const rows = getTableRows(wrapped);
  rows.forEach((row, rowIndex) => {
    const cells = getTableCells(row);

    cells.forEach((cell, cellIndex) => {
      // Have to do this because numbers are rendered with thousand seperators (',')
      const sampleDataCell = applyThousandsSeperator(sampleTableData[rowIndex][cellIndex]);
      expect(cell.text() === sampleDataCell).toBeTruthy();
    });
  });
});

it('sorts the column on head click and displays the correct icon indicator', () => {
  let firstHeadCell = wrapped.find('.MuiTableCell-head').first();
  const rows = wrapped.find('.MuiTableRow-root:not(.MuiTableRow-head)');

  // Starts off with drop up icon because first column is sorted already
  let iconIndicator = firstHeadCell.find(ArrowDropUpIcon);
  expect(iconIndicator).toHaveLength(1);

  // First click sorts in descending
  firstHeadCell.simulate('click');
  wrapped.update();

  const firstColumnValues = rows.map((row) => row.find('.MuiTableCell-root').first());

  let prevValue = firstColumnValues[0];
  for (let i = 1; i < firstColumnValues.length; i++) {
    expect(firstColumnValues[i] <= prevValue).toBeTruthy();
    prevValue = firstColumnValues[i];
  }

  // Check icon
  firstHeadCell = wrapped.find('.MuiTableCell-head').first();
  iconIndicator = firstHeadCell.find(ArrowDropDownIcon);
  expect(iconIndicator).toHaveLength(1);

  // Second ascending
  firstHeadCell.simulate('click');
  wrapped.update();

  prevValue = firstColumnValues[0];
  for (let i = 1; i < firstColumnValues.length; i++) {
    expect(firstColumnValues[i] >= prevValue).toBeTruthy();
    prevValue = firstColumnValues[i];
  }

  firstHeadCell = wrapped.find('.MuiTableCell-head').first();
  iconIndicator = firstHeadCell.find(ArrowDropUpIcon);
  expect(iconIndicator).toHaveLength(1);
});
