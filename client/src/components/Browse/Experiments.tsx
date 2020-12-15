import { useEffect } from 'react';
import AOS from 'aos';

import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';

import { sampleTableData } from 'variables/browseTableData';
import { options, searchOptions } from 'variables/browseFilterOptions';

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
      initialTableData={sampleTableData}
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
      initialFilterValues={{ 0: ['Human', 'Rat'], 5: [10000, 55000] }}
      filters={[
        {
          type: 'MultiSelect',
          name: 'Species',
          defaultValueIndexes: [0, 1],
          onIndex: 0,
          options,
        },
        {
          type: 'RangeSlider',
          name: 'Peptides',
          onIndex: 5,
          min: 0,
          max: 74400,
        },
        {
          type: 'SingleSelect',
          name: 'Search',
          onIndex: 2,
          options: searchOptions,
        },
      ]}
      {...props}
    />
  );
};

export default Experiments;
