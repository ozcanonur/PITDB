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
  [filterName: string]: string | string[] | [number, number] | null;
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

  // const initialFilterState: GenericObject = {};
  // tableHead.forEach((value) => {
  //   initialFilterState[value] = [];
  // });

  const [tableData, setTableData] = useState(initialTableData);
  const [filterTableBy, setFilterTableBy] = useState({ ...initialFilterValues });

  // Apply filters on change
  useEffect(() => {
    // if (JSON.stringify(filterTableBy) === JSON.stringify({ ...initialFilterState, ...initialFilterValues })) return;
    if (filterTableBy)
      // Sample table data is the actual data
      setTableData(filterTable(sampleTableData, filterTableBy));
  }, [filterTableBy]);

  const multiSelectOnChange = (selectedOptions: SelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) {
      // @ts-ignore
      setFilterTableBy({ ...filterTableBy, [actionMeta.name]: [] });
      return;
    }

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    const filterName = actionMeta.name as string;
    const newFilters = { ...filterTableBy, [filterName]: currentlySelectedValues };

    setFilterTableBy(newFilters);
  };

  const onSingleSelectChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    const filterName = 'Experiment Accession';
    const newFilters = { ...filterTableBy, [filterName]: selectedOption?.value || null };

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
