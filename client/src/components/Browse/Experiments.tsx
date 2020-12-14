import { useState, useEffect, ChangeEvent } from 'react';
import { ActionMeta } from 'react-select';

import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import RangeSlider from 'components/UI/RangeSlider/RangeSlider';

import { useStyles } from './styles/experiments';
import { options, options2, searchOptions } from 'variables/browseFilterOptions';
import { sampleTableData } from 'variables/browseTableData';

const filterTable = (tableData: string[][], filterTableBy: GenericObject) => {
  // Apply filters
  let filteredTableData = tableData;
  Object.keys(filterTableBy).forEach((filterName) => {
    const currentFilters = filterTableBy[filterName];
    // If it's a ordinal string filter
    if (typeof currentFilters[0] === 'string')
      filteredTableData = filteredTableData.filter((e) => currentFilters.includes(e[0]));
    else {
      // If it's a number slider filter
      const [min, max] = currentFilters;
      filteredTableData = filteredTableData.filter((e) => parseInt(e[5]) > min && parseInt(e[5]) < max);
    }
  });

  return filteredTableData;
};

const Experiments = ({ ...props }) => {
  const classes = useStyles();

  const [filterTableBy, setFilterTableBy] = useState<GenericObject>({ Species: ['Human'], Peptides: [10000, 55000] });
  const [tableData, setTableData] = useState(sampleTableData);

  useEffect(() => {
    setTableData(filterTable(sampleTableData, filterTableBy));
  }, [filterTableBy]);

  const multiSelectOnChange = (selectedOptions: SelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) {
      setTableData([]);
      return;
    }

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    const filterName = actionMeta.name as string;
    const newFilters = { ...filterTableBy, [filterName]: currentlySelectedValues };

    setFilterTableBy(newFilters);
  };

  const onSliderChangeCommited = (_event: ChangeEvent<{}>, values: number | number[], sliderName: string) => {
    const newFilters = { ...filterTableBy, [sliderName]: values };
    setFilterTableBy(newFilters);
  };

  return (
    <section className={classes.container} {...props}>
      <div className={classes.filtersContainer}>
        <MultiSelect
          options={options}
          name='Species'
          defaultValueIndex={0}
          onChange={multiSelectOnChange}
          className={classes.multiSelect}
        />
        <MultiSelect
          options={options2}
          name='Some filter'
          onChange={multiSelectOnChange}
          className={classes.multiSelect}
        />
        <RangeSlider
          name='Peptides'
          min={0}
          max={60000}
          initialMin={10000}
          initialMax={55000}
          onChangeCommited={onSliderChangeCommited}
        />
        <SingleSelect name='Search' options={searchOptions} className={classes.searchMultiSelect} />
      </div>
      <div className={classes.tableContainer}>
        <Table
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
          tableData={tableData}
          clickableCells={{ '1': () => {}, '2': () => {} }}
        />
      </div>
    </section>
  );
};

export default Experiments;
