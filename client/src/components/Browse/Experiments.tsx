import { useEffect } from 'react';
import AOS from 'aos';

import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';

import { sampleTableData } from 'variables/browseTableData';
import { options, searchOptions, options3 } from 'variables/browseFilterOptions';

const Experiments = ({ ...props }) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const clickableCells = { '2': () => {}, '3': () => {} };

  return (
    <ExtendedTable
      data-aos='fade-in'
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
      filters={[
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
      ]}
      clickableCells={clickableCells}
      {...props}
    />
  );
};

export default Experiments;
