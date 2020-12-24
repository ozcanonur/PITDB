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
import { setTranscriptUsageFilters, selectTranscriptUsage, selectTranscriptViewerTranscript } from 'actions';
import { parseDiscreteSliderMarks } from './helpers';

const SplicingEventsTable = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const filters = useSelector((state: RootState) => state.transcriptUsageFilters);
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

  const fetchNewTranscriptUsages = async (mounted: boolean) => {
    setLoading(true);

    const res = await fetchFromApi('/api/transcript-usages', {
      project,
      skip: 0,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });

    if (!mounted || !res) return;

    const { transcriptUsages, transcriptUsagesCount } = res;

    if (transcriptUsages.length === 0) {
      setTableData([]);
      setRowCount(0);
      setCurrentPage(0);
      setLoading(false);
      return;
    }

    const newRowCount = parseInt(transcriptUsagesCount);
    setRowCount(newRowCount);

    const newTableData: string[][] = transcriptUsages.map(Object.values);
    setTableData(newTableData);

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [gene, transcript] = firstRow;
    dispatch(selectTranscriptUsage(gene, transcript));
    dispatch(selectTranscriptViewerTranscript(transcript));

    setCurrentPage(0);

    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    fetchNewTranscriptUsages(mounted);

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

    fetchNewTranscriptUsages(mounted);

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

    const { transcriptUsages } = await fetchFromApi('/api/transcript-usages', {
      project,
      skip,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });
    setTableData([...tableData, ...transcriptUsages.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectTranscriptUsageOnClick = (row: string[]) => {
    setSelectedRow(row);
    const [gene, transcript] = row;
    dispatch(selectTranscriptUsage(gene, transcript));
    dispatch(selectTranscriptViewerTranscript(transcript));
  };

  // WOOP, there is no peptide evidence yet, hard coded it
  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);
    dispatch(setTranscriptUsageFilters({ ...filters, [name]: newSelectedValues }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) =>
    await fetchFromApi('/api/transcript-usages/gene-names', { project, searchInput: inputValue });

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender via useEffect
    if (!selectedOption) {
      dispatch(setTranscriptUsageFilters({ ...filters }));
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    fetchFromApi('/api/transcript-usages/by-gene-name', { project, geneName: selectedOption.value }).then((res) => {
      if (!res) return;

      const newRowCount = res.length;
      setRowCount(newRowCount);

      const newTableData = res.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(firstRow);

      const [gene, transcript] = firstRow;
      dispatch(selectTranscriptUsage(gene, transcript));
      dispatch(selectTranscriptViewerTranscript(transcript));

      setCurrentPage(0);

      setLoading(false);
    });
  };

  const pValueMarks = ['0.001', '0.01', '0.05', '0.1', '1'];

  const onPValueChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMaxPValueFilterValue = parseFloat(pValueMarks[value]);
    dispatch(setTranscriptUsageFilters({ ...filters, maxPValue: newMaxPValueFilterValue }));
  };

  return (
    <ProjectItemCard className={classes.container} name='Transcript Usage' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          promiseOptions={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.multiSelectContainer}>
          <MultiSelect
            name='Peptide evidence'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['false', 'true']}
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
        tableHead={['Gene', 'Transcript', 'dPSI', 'P value', 'Peptide evidence']}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        className={classes.tableContainer}
        rowOnClick={selectTranscriptUsageOnClick}
        selectedRow={selectedRow}
        sortedOn={sortedOn}
        handleSort={handleSort}
      />
    </ProjectItemCard>
  );
};

export default SplicingEventsTable;