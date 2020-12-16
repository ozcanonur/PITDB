import React from 'react';
import ReactDOM from 'react-dom';
import ExtendedTable from '../UI/ExtendedTable/ExtendedTable';

import { sampleTableData } from 'variables/browseTableData';
import { options, searchOptions, options3 } from 'variables/browseFilterOptions';

it('renders ExtendedTable without crashing', () => {
  const div = document.createElement('div');

  const clickableCells = { 2: () => {}, 3: () => {} };

  const filters = [
    {
      type: 'MultiSelect',
      onIndex: 0,
      name: 'Species',
      defaultValueIndexes: [0, 1],
      options,
    },
    {
      type: 'MultiSelect',
      onIndex: 1,
      name: 'Quality',
      defaultValueIndexes: [1],
      options: options3,
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
      options: searchOptions,
    },
  ];

  ReactDOM.render(
    <ExtendedTable
      initialTableData={sampleTableData}
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
      clickableCells={clickableCells}
    />,
    div
  );

  console.log(div.innerHTML);

  ReactDOM.unmountComponentAtNode(div);
});
