import { useState, useEffect, ChangeEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
// import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { useStyles } from './styles';
import { fetchFromApi } from 'utils';
import { parseDiscreteSliderMarks, makeVersusConditionTypes } from './helpers';
import { setDGEFilters, selectDGE } from 'actions';
import { DGESResponse, SymbolNamesResponse } from './types';
import { SelectOption } from 'components/UI/MultiSelect/types';

const DGETable = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const filters = useSelector((state: RootState) => state.DGEFilters);
  const [sortedOn, setSortedOn] = useState<{ field: string; order: -1 | 1 }>({
    field: 'Symbol',
    order: 1,
  });

  const [tableData, setTableData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  const dispatch = useDispatch();

  const updateTable = ({ dges, dgesCount }: DGESResponse) => {
    setRowCount(dgesCount);

    const newTableData = dges.map(Object.values);
    setTableData(newTableData);

    setCurrentPage(0);

    if (dgesCount === 0) return;

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [symbol] = firstRow;
    dispatch(selectDGE(symbol));
  };

  // Refetch on filters change
  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/dges', {
      project,
      skip: 0,
      filters: filters as any,
      sortedOn: sortedOn as any,
    }).then((res: DGESResponse) => {
      if (!isMounted || !res) return;

      updateTable(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, filters]);

  // Refetch on sort
  // Don't run on first render, avoids double fetching
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/dges', {
      project,
      skip: 0,
      filters: filters as any,
      sortedOn: sortedOn as any,
    }).then((res: DGESResponse) => {
      if (!isMounted || !res) return;

      updateTable(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, sortedOn]);

  const handleSort = (field: string, currentOrder?: -1 | 1) => {
    const newSortOrder = currentOrder ? -currentOrder : 1;
    setSortedOn({ field, order: newSortOrder as -1 | 1 });
  };

  const handlePageChange = async (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    setCurrentPage(page);

    const skip = page * rowsPerPage;
    const haveToFetchMore = tableData.length <= skip;

    if (!haveToFetchMore) return;

    setLoading(true);

    const { dges }: DGESResponse = await fetchFromApi('/api/dges', {
      project,
      skip,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });

    setLoading(false);

    setTableData([...tableData, ...dges.map(Object.values)]);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectDGEOnClick = (row: string[]) => {
    setSelectedRow(row);
    const [symbolName] = row;
    dispatch(selectDGE(symbolName));
  };

  const pValueMarks = ['0.001', '0.01', '0.05', '0.1', '1'];

  const onPValueChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMaxPValue = parseFloat(pValueMarks[value]);

    if (newMaxPValue === filters.maxPValue) return;

    dispatch(setDGEFilters({ ...filters, maxPValue: newMaxPValue }));
  };

  const foldChangeMarks = ['0', '0.5', '1', '5', '10'];

  const onFoldChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinAbsFoldChange = parseFloat(foldChangeMarks[value]);

    if (newMinAbsFoldChange === filters.minAbsFoldChange) return;

    dispatch(setDGEFilters({ ...filters, minAbsFoldChange: newMinAbsFoldChange }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) => {
    const symbolNames: SymbolNamesResponse = await fetchFromApi('/api/dges/symbol-names', {
      project,
      searchInput: inputValue,
    });

    // Single select component accepts data in this format
    return symbolNames.map(({ _id }) => ({ value: _id, label: _id }));
  };

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    const symbol = selectedOption ? selectedOption.value : '';
    dispatch(setDGEFilters({ ...filters, symbol }));
  };

  // // WOOP, Hard coded peptide evidence on multiselect
  // const multiSelectOnChange = (
  //   selectedOptions: SelectOption[],
  //   _actionMeta: ActionMeta<any>,
  //   name: string
  // ) => {
  //   const newSelectedValues = (selectedOptions || []).map((option) => option.value);

  //   dispatch(setDGEFilters({ ...filters, [name]: newSelectedValues }));
  // };

  const versusConditionTypes = makeVersusConditionTypes(conditionTypes);

  return (
    <ProjectItemCard className={classes.container} name='Differential Gene Expressions' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search symbol'
          options={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
          defaultInputValue={filters.symbol}
        />
        {/* WOOP, no handle change for now */}
        <SingleSelect
          name='Conditions'
          options={versusConditionTypes}
          isAsync={false}
          defaultInputValue={versusConditionTypes[0]}
          onChange={() => {}}
          className={classes.singleSelect}
        />
        {/* <MultiSelect
            name='Peptide evidence'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['false']}
            onChange={(selectedOptions, _actionMeta) =>
              multiSelectOnChange(selectedOptions, _actionMeta, 'inCDS')
            }
            className={classes.multiSelect}
          /> */}
        <DiscreteSlider
          name='Max. p value'
          defaultValue={filters.maxPValue}
          marks={parseDiscreteSliderMarks(pValueMarks)}
          onChangeCommited={onPValueChangeCommited}
        />
        <DiscreteSlider
          name='Min. abs. fold change'
          defaultValue={filters.minAbsFoldChange}
          marks={parseDiscreteSliderMarks(foldChangeMarks)}
          onChangeCommited={onFoldChangeCommited}
        />
      </div>
      <Table
        tableData={tableData}
        tableHead={['Symbol', 'Log2 fold change', 'Adj. p value']}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        className={classes.tableContainer}
        rowOnClick={selectDGEOnClick}
        selectedRow={selectedRow}
        sortedOn={sortedOn}
        handleSort={handleSort}
      />
    </ProjectItemCard>
  );
};

export default DGETable;
