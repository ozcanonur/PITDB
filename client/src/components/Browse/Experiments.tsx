import { useEffect } from 'react';
import AOS from 'aos';

import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';

import { sampleTableData } from 'variables/browseTableData';
import { options, options2, searchOptions } from 'variables/browseFilterOptions';

const Experiments = ({ ...props }) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const clickableCells = { '1': () => {}, '2': () => {} };

  return (
    <ExtendedTable
      data-aos='fade-in'
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
      initialFilterValues={{ Species: ['Human', 'Rat'], Peptides: [10000, 55000] }}
      filters={[
        {
          type: 'MultiSelect',
          name: 'Species',
          defaultValueIndexes: [0, 1],
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
          max: 74400,
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
