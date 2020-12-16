import { useState, useEffect, ChangeEvent } from 'react';
import { ActionMeta, OptionsType } from 'react-select';

import Table from 'components/UI/Table/Table';
import Filters from './Filters';

import { useStyles } from './styles/extendedTable';
import { sampleTableData } from 'variables/browseTableData';
import { filterTable, getInitialFilterValues } from './helpers';

export interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndexes?: number[];
  defaultValues?: [number, number];
  onIndex: number;
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
}

export interface FilterTableBy {
  [filterName: string]: string | string[] | [number, number] | null;
}

const ExtendedTable = ({ initialTableData, tableHead, clickableCells, filters, ...props }: Props) => {
  const classes = useStyles();

  const initialFilterValues = getInitialFilterValues(filters);

  const [tableData, setTableData] = useState(initialTableData);
  const [filterTableBy, setFilterTableBy] = useState(initialFilterValues);

  // Apply filters on change
  useEffect(() => {
    // Sample table data is the actual data
    if (filterTableBy) setTableData(filterTable(sampleTableData, filterTableBy));
  }, [filterTableBy]);

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, onIndex: number) => {
    if (!selectedOptions) {
      // @ts-ignore
      setFilterTableBy({ ...filterTableBy, [onIndex]: [] });
      return;
    }

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    const newFilters = { ...filterTableBy, [onIndex]: currentlySelectedValues };

    setFilterTableBy(newFilters);
  };

  const onSingleSelectChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>, onIndex: number) => {
    const newFilters = { ...filterTableBy, [onIndex]: selectedOption?.value || null };

    setFilterTableBy(newFilters);
  };

  const onSliderChangeCommited = (_event: ChangeEvent<{}>, values: [number, number], onIndex: number) => {
    const newFilters = { ...filterTableBy, [onIndex]: values };
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
