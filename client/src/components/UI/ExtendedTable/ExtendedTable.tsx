import { useState, useEffect, ChangeEvent } from 'react';
import { ActionMeta, OptionsType } from 'react-select';

import Table from 'components/UI/Table/Table';
import Filters from './Filters';

import { isStringArray } from 'utils';
import { useStyles } from './styles/extendedTable';
import { sampleTableData } from 'variables/browseTableData';

interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndex?: number;
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}

interface Props {
  initialtableData: string[][];
  tableHead: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  filters?: Filter[];
  initialFilterValues?: FilterTableBy;
}

interface FilterTableBy {
  [filterName: string]: string[] | [number, number];
}

const filterTable = (tableData: string[][], filterTableBy: FilterTableBy) => {
  let filteredTableData = tableData;
  Object.keys(filterTableBy).forEach((filterName) => {
    const currentFilters = filterTableBy[filterName];
    // If it's a ordinal string filter
    if (isStringArray(currentFilters))
      // @ts-ignore
      filteredTableData = filteredTableData.filter((e) => currentFilters.includes(e[0]));
    else {
      // If it's a number slider filter
      const [min, max] = currentFilters;
      filteredTableData = filteredTableData.filter((e) => parseInt(e[5]) > min && parseInt(e[5]) < max);
    }
  });

  return filteredTableData;
};

const ExtendedTable = ({
  initialtableData,
  tableHead,
  clickableCells,
  filters,
  initialFilterValues,
  ...props
}: Props) => {
  const classes = useStyles();

  const [tableData, setTableData] = useState(initialtableData);
  const [filterTableBy, setFilterTableBy] = useState(initialFilterValues);

  useEffect(() => {
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

  const onSliderChangeCommited = (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => {
    const newFilters = { ...filterTableBy, [sliderName]: values };
    setFilterTableBy(newFilters);
  };

  return (
    <section className={classes.container} {...props}>
      <div className={classes.filtersContainer}>
        <Filters
          filters={filters}
          multiSelectOnChange={multiSelectOnChange}
          onSliderChangeCommited={onSliderChangeCommited}
        />
      </div>
      <div className={classes.tableContainer}>
        <Table tableHead={tableHead} tableData={tableData} clickableCells={clickableCells} />
      </div>
    </section>
  );
};

export default ExtendedTable;
