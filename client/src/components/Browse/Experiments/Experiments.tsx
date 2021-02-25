import { useEffect } from 'react';
import AOS from 'aos';

import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';
import { Filter } from 'components/UI/ExtendedTable/types';

import { sampleTableData } from 'variables/browseTableData';

import { useStyles } from './styles';

const Experiments = ({ ...props }) => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

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
  ];

  // Extended table is a component for Table + filters combined
  // Later on I redecided not to use it
  // So feel free to remove this and use the regular Table component
  // With custom filter callback functions
  return (
    <ExtendedTable
      data-aos='fade-in'
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
      className={classes.extendedTable}
      {...props}
    />
  );
};

export default Experiments;
