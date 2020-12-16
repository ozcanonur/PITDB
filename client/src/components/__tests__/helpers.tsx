import { ReactWrapper, mount } from 'enzyme';
import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';
import Table from 'components/UI/Table/Table';
import { Filter } from 'components/UI/ExtendedTable/types';

import { sampleTableData } from 'variables/browseTableData';

export const replaceAll = (str: string, find: string, replace: string) => {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), replace);
};

export const applyThousandsSeperator = (value: string) =>
  isNaN(value as any) ? value : parseInt(value).toLocaleString();

export const getTableRows = (wrapped: ReactWrapper) => wrapped.find('.MuiTableRow-root:not(.MuiTableRow-head)');

export const getTableCells = (row: ReactWrapper) => row.find('.MuiTableCell-root');

export const getColumnValues = (wrapped: ReactWrapper, index: number) => {
  const values: string[] = [];

  const rows = getTableRows(wrapped);

  rows.forEach((row) => {
    const cells = getTableCells(row);
    values.push(cells.at(index).text());
  });

  return values;
};

export const mountTable = () => {
  const wrapped = mount(
    <Table
      tableData={sampleTableData}
      tableHead={[
        'Species',
        'Quality',
        'Sample Accession',
        'Experiment Accession',
        'TGEs',
        'Transcripts',
        'Peptides',
        'PSMs',
        'Variations',
      ]}
    />
  );

  return wrapped;
};

export const mountExtendedTable = () => {
  const filters: Filter[] = [
    {
      type: 'MultiSelect',
      onIndex: 0,
      name: 'Species',
      defaultValues: ['Human', 'Rat'],
    },
    {
      type: 'MultiSelect',
      onIndex: 1,
      name: 'Quality',
      defaultValues: ['Medium'],
    },
    {
      type: 'RangeSlider',
      onIndex: 6,
      name: 'Peptides',
      min: 0,
      max: 74400,
      defaultValues: [10000, 55000],
    },
    {
      type: 'SingleSelect',
      onIndex: 3,
      name: 'Search',
    },
  ];

  const wrapped = mount(
    <ExtendedTable
      tableData={sampleTableData}
      tableHead={[
        'Species',
        'Quality',
        'Sample Accession',
        'Experiment Accession',
        'TGEs',
        'Transcripts',
        'Peptides',
        'PSMs',
        'Variations',
      ]}
      filters={filters}
    />
  );

  return wrapped;
};

it('Mock test to include helpers.ts', () => {});
