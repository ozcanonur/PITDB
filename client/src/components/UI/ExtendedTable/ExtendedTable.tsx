import { useState, useEffect, ChangeEvent } from 'react';
import { ActionMeta, OptionsType } from 'react-select';

import Table from 'components/UI/Table/Table';
import Filters from './Filters';

import { useStyles } from './styles/extendedTable';
import { sampleTableData } from 'variables/browseTableData';
import { filterTable } from './helpers';

interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndexes?: number[];
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}

interface Props {
  initialTableData: string[][];
  tableHead: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  filters?: Filter[];
  initialFilterValues: FilterTableBy;
}

export interface FilterTableBy {
  [filterName: string]: string[] | [number, number];
}

const ExtendedTable = ({
  initialTableData,
  tableHead,
  clickableCells,
  filters,
  initialFilterValues,
  ...props
}: Props) => {
  const classes = useStyles();

  const [tableData, setTableData] = useState(initialTableData);
  const [filterTableBy, setFilterTableBy] = useState(initialFilterValues);

  useEffect(() => {
    // Sample table data is the actual data
    if (filterTableBy) setTableData(filterTable(sampleTableData, filterTableBy));
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

  const onSingleSelectChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (!selectedOption) {
      delete filterTableBy['Experiment Accession'];
      setFilterTableBy({ ...filterTableBy });
      return;
    }

    const filterName = 'Experiment Accession';
    const newFilters = { ...filterTableBy, [filterName]: [selectedOption.value] };

    setFilterTableBy(newFilters);
  };

  const onSliderChangeCommited = (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => {
    const newFilters = { ...filterTableBy, [sliderName]: values };
    setFilterTableBy(newFilters);
  };

  return (
    <section className={classes.container} {...props}>
      <div className={classes.filtersContainer}>
        <Filters
          filters={filters}
          onSingleSelectChange={onSingleSelectChange}
          multiSelectOnChange={multiSelectOnChange}
          onSliderChangeCommited={onSliderChangeCommited}
          initialFilterValues={initialFilterValues}
        />
      </div>
      <div className={classes.tableContainer}>
        <Table tableHead={tableHead} tableData={tableData} clickableCells={clickableCells} />
      </div>
    </section>
  );
};

export default ExtendedTable;
