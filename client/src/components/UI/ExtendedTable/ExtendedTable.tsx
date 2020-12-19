// @ts-nocheck
import { useState, useEffect, ChangeEvent } from 'react';
import { ActionMeta } from 'react-select';

import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import RangeSlider from 'components/UI/RangeSlider/RangeSlider';

import { ExtendedTableProps } from './types';
import { useStyles } from './styles/extendedTable';
import { filterTable, getInitialFilterValues } from './helpers';

const ExtendedTable = ({
  tableData,
  tableHead,
  clickableCells,
  filters,
  options,
  isSortable = true,
  ...props
}: ExtendedTableProps) => {
  const classes = useStyles();

  const initialFilterValues = getInitialFilterValues(tableData, filters);

  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [filterTableBy, setFilterTableBy] = useState(initialFilterValues);

  // Apply filters on any filter update
  useEffect(() => {
    if (filterTableBy) setFilteredTableData(filterTable(tableData, filterTableBy));
  }, [filterTableBy, tableData]);

  const onSingleSelectChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>, onIndex: number) => {
    // On clear
    if (!selectedOption) {
      setFilteredTableData(tableData);
      // Trigger a rerender via useEffect
      setFilterTableBy({ ...filterTableBy });
      return;
    }

    const selectedRow = tableData.find((row) => row[onIndex] === selectedOption.value) || [];
    setFilteredTableData([selectedRow]);
  };

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, onIndex: number) => {
    if (!selectedOptions) {
      setFilterTableBy({ ...filterTableBy, [onIndex]: [] });
      return;
    }

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    const newFilters = { ...filterTableBy, [onIndex]: currentlySelectedValues };

    setFilterTableBy(newFilters);
  };

  const onSliderChangeCommited = (_event: ChangeEvent<{}>, values: [number, number], onIndex: number) => {
    const newFilters = { ...filterTableBy, [onIndex]: values };
    setFilterTableBy(newFilters);
  };

  return (
    <section {...props}>
      <div className={classes.filtersContainer}>
        {filters
          ? filters.map(({ type, name, onIndex, defaultValues, options, min, max }) =>
              type === 'SingleSelect' ? (
                <SingleSelect
                  key={onIndex}
                  name={name}
                  options={options as any}
                  onChange={(values, actionMeta) => onSingleSelectChange(values, actionMeta, onIndex)}
                  className={classes.searchMultiSelect}
                />
              ) : type === 'MultiSelect' ? (
                <MultiSelect
                  key={onIndex}
                  name={name}
                  options={options as any}
                  // @ts-ignore
                  defaultValues={defaultValues}
                  onChange={(values, actionMeta) => multiSelectOnChange(values, actionMeta, onIndex)}
                  className={classes.multiSelect}
                />
              ) : type === 'RangeSlider' ? (
                <RangeSlider
                  key={onIndex}
                  name={name}
                  min={min as any}
                  max={max as any}
                  initialSmallNum={initialFilterValues[onIndex][0] as number}
                  initialLargeNum={initialFilterValues[onIndex][1] as number}
                  onChangeCommited={(event, values) => onSliderChangeCommited(event, values, onIndex)}
                  className={classes.rangeSlider}
                />
              ) : null
            )
          : null}
      </div>
      <div className={classes.tableContainer}>
        <Table
          tableHead={tableHead}
          tableData={filteredTableData}
          clickableCells={clickableCells}
          currentPage={0}
          handlePageChange={() => {}}
          rowCount={5}
          loading={false}
        />
      </div>
    </section>
  );
};

export default ExtendedTable;
