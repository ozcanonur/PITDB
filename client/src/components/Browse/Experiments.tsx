import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';

import { sampleTableData } from 'variables/browseTableData';
import { options, options2, searchOptions } from 'variables/browseFilterOptions';

const Experiments = ({ ...props }) => {
  const clickableCells = { '1': () => {}, '2': () => {} };

  return (
    <ExtendedTable
      initialtableData={sampleTableData}
      tableHead={[
        'Species',
        'Sample Accession',
        'Experiment Accession',
        'TGEs',
        'Transcripts',
        'Peptides',
        'PSMs',
        'Variations',
      ]}
      clickableCells={clickableCells}
      initialFilterValues={{ Species: ['Human'], Peptides: [10000, 55000] }}
      filters={[
        {
          type: 'MultiSelect',
          name: 'Species',
          defaultValueIndex: 0,
          options,
        },
        {
          type: 'MultiSelect',
          name: 'Some Filter',
          options: options2,
        },
        {
          type: 'RangeSlider',
          name: 'Peptides',
          min: 0,
          max: 80000,
        },
        {
          type: 'SingleSelect',
          name: 'Search',
          options: searchOptions,
        },
      ]}
      {...props}
    />
  );
};

export default Experiments;
