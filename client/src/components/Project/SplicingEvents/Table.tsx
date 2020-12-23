import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';

import { useStyles } from './styles/table';
import { fetchFromApi } from 'utils';
import { setSplicingEventsFilters, selectSplicingEvent } from 'actions';
import { parseDiscreteSliderMarks } from './helpers';

const SplicingEventsTable = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const filters = useSelector((state: RootState) => state.splicingEventsFilters);
  const [sortedOn, setSortedOn] = useState<{ field: string; order?: -1 | 1 }>({
    field: 'Gene',
    order: 1,
  });

  const [tableData, setTableData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  const dispatch = useDispatch();

  const fetchNewSplicingEvents = async (mounted: boolean) => {
    setLoading(true);

    const res = await fetchFromApi('/api/splicingEvents', {
      project,
      skip: 0,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });

    if (!mounted || !res) return;

    const { splicingEvents, splicingEventsCount } = res;

    if (splicingEvents.length === 0) {
      setTableData([]);
      setRowCount(0);
      setCurrentPage(0);
      setLoading(false);
      return;
    }

    const newRowCount = parseInt(splicingEventsCount);
    setRowCount(newRowCount);

    const newTableData: string[][] = splicingEvents.map(Object.values);
    setTableData(newTableData);

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [gene, , , , , dPSI] = firstRow;
    dispatch(selectSplicingEvent(gene, parseFloat(dPSI)));

    setCurrentPage(0);

    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    fetchNewSplicingEvents(mounted);

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

    fetchNewSplicingEvents(mounted);

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

    const { splicingEvents } = await fetchFromApi('/api/splicingEvents', {
      project,
      skip,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });
    setTableData([...tableData, ...splicingEvents.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectSplicingEventOnClick = (row: string[]) => {
    setSelectedRow(row);
    const [gene, , , , , dPSI] = row;
    dispatch(selectSplicingEvent(gene, parseFloat(dPSI)));
  };

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);
    dispatch(setSplicingEventsFilters({ ...filters, [name]: newSelectedValues }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) =>
    await fetchFromApi('/api/splicingEvents/geneNames', { project, searchInput: inputValue });

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender via useEffect
    if (!selectedOption) {
      dispatch(setSplicingEventsFilters({ ...filters }));
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    fetchFromApi('/api/splicingEvents/byGeneName', { project, geneName: selectedOption.value }).then((res) => {
      if (!res) return;

      const newRowCount = res.length;
      setRowCount(newRowCount);

      const newTableData = res.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(firstRow);

      const [gene, , , , , dPSI] = firstRow;
      dispatch(selectSplicingEvent(gene, dPSI));

      setCurrentPage(0);

      setLoading(false);
    });
  };

  const pValueMarks = ['0.001', '0.01', '0.05', '0.1', '1'];

  const onPValueChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMaxPValueFilterValue = parseFloat(pValueMarks[value]);
    dispatch(setSplicingEventsFilters({ ...filters, maxPValue: newMaxPValueFilterValue }));
  };

  return (
    <ProjectItemCard className={classes.container} name='Splicing Events' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          promiseOptions={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.multiSelectContainer}>
          <MultiSelect
            name='Strand'
            options={[
              { value: '-', label: '-' },
              { value: '+', label: '+' },
            ]}
            defaultValues={['-', '+']}
            onChange={(selectedOptions, _actionMeta) => multiSelectOnChange(selectedOptions, _actionMeta, 'strand')}
            className={classes.multiSelect}
          />
          <MultiSelect
            name='Peptide evidence'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['true']}
            onChange={(selectedOptions, _actionMeta) =>
              multiSelectOnChange(selectedOptions, _actionMeta, 'hasPeptideEvidence')
            }
            className={classes.multiSelect}
          />
          <DiscreteSlider
            name='Max. p value'
            defaultValue={0.05}
            marks={parseDiscreteSliderMarks(pValueMarks)}
            onChangeCommited={onPValueChangeCommited}
          />
        </div>
      </div>
      <Table
        tableData={tableData}
        tableHead={['Gene', 'Strand', 'Type', 'Start', 'End', 'dPSI', 'P Value', 'Peptide evidence']}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        className={classes.tableContainer}
        rowOnClick={selectSplicingEventOnClick}
        selectedRow={selectedRow}
        sortedOn={sortedOn}
        handleSort={handleSort}
      />
    </ProjectItemCard>
  );
};

export default SplicingEventsTable;
