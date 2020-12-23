import { useState, useEffect, ChangeEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { useStyles } from './styles/table';
import { fetchFromApi } from 'utils';
import { parseDiscreteSliderMarks } from './helpers';
import { setDGEFilters, selectDGE } from 'actions';

const DGETable = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const filters = useSelector((state: RootState) => state.DGEFilters);
  const [sortedOn, setSortedOn] = useState<{ field: string; order?: -1 | 1 }>({
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

  const fetchNewDges = (mounted: boolean) => {
    setLoading(true);

    fetchFromApi('/api/dges', { project, skip: 0, filters: filters as any, sortedOn: sortedOn as any }).then((res) => {
      if (!mounted || !res) return;

      const { dges, dgesCount } = res;

      if (dgesCount.length === 0) {
        setTableData([]);
        setRowCount(0);
        setCurrentPage(0);
        setLoading(false);
        return;
      }

      const newRowCount = parseInt(dgesCount);
      setRowCount(newRowCount);

      const newTableData = dges.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(firstRow);

      const [symbol] = firstRow;
      dispatch(selectDGE(symbol));

      setCurrentPage(0);

      setLoading(false);
    });
  };

  useEffect(() => {
    let mounted = true;

    fetchNewDges(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, filters]);

  // Don't run on first render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let mounted = true;

    fetchNewDges(mounted);

    return () => {
      mounted = false;
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

    const { dges } = await fetchFromApi('/api/dges', { project, skip, filters: filters as any });
    setTableData([...tableData, ...dges.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectDGEOnClick = (row: string[]) => {
    setSelectedRow(row);
    const symbolName = row[0];
    dispatch(selectDGE(symbolName));
  };

  const pValueMarks = ['0.001', '0.01', '0.05', '0.1', '1'];

  const onPValueChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMaxPValueFilterValue = parseFloat(pValueMarks[value]);
    dispatch(setDGEFilters({ ...filters, maxPValue: newMaxPValueFilterValue }));
  };

  const foldChangeMarks = ['0', '0.5', '1', '5', '10'];

  const onFoldChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinFoldChangeFilterValue = parseFloat(foldChangeMarks[value]);
    dispatch(setDGEFilters({ ...filters, minAbsFoldChange: newMinFoldChangeFilterValue }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) =>
    await fetchFromApi('/api/dges/symbolNames', { project, searchInput: inputValue });

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender with the actual set filters via useEffect
    if (!selectedOption) {
      dispatch(setDGEFilters({ ...filters }));
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    fetchFromApi('/api/dges/bySymbolName', { project, symbol: selectedOption.value }).then((res) => {
      if (!res) return;

      const newRowCount = res.length;
      setRowCount(newRowCount);

      const newTableData = res.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(newTableData[0]);

      const [symbolName] = firstRow;
      dispatch(selectDGE(symbolName));

      setCurrentPage(0);

      setLoading(false);
    });
  };

  // WOOP, Hard coded peptide evidence on multiselect
  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);

    dispatch(setDGEFilters({ ...filters, [name]: newSelectedValues }));
  };

  return (
    <ProjectItemCard className={classes.container} name='Differential Gene Expressions' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search symbol'
          promiseOptions={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.slidersContainer}>
          <MultiSelect
            name='Peptide evidence'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['false']}
            onChange={(selectedOptions, _actionMeta) => multiSelectOnChange(selectedOptions, _actionMeta, 'inCDS')}
            className={classes.multiSelect}
          />
          <DiscreteSlider
            name='Max. p value'
            defaultValue={0.05}
            marks={parseDiscreteSliderMarks(pValueMarks)}
            onChangeCommited={onPValueChangeCommited}
          />
          <DiscreteSlider
            name='Min. abs. fold change'
            defaultValue={1}
            marks={parseDiscreteSliderMarks(foldChangeMarks)}
            onChangeCommited={onFoldChangeCommited}
          />
        </div>
      </div>
      <Table
        tableData={tableData}
        tableHead={['Symbol', 'Log2 fold change', 'P value', 'Peptide evidence']}
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
