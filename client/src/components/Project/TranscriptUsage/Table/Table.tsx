import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import Category3 from 'assets/category3.svg';

import { useStyles } from './styles';
import { fetchFromApi } from 'utils';
import {
  setTranscriptUsageFilters,
  selectTranscriptUsage,
  selectTranscriptViewerTranscript,
  selectTranscriptViewerTranscriptColor,
  setGeneBrowserFilters,
} from 'actions';
import { parseDiscreteSliderMarks, makeVersusConditionTypes } from './helpers';
import { SelectOption } from 'components/UI/MultiSelect/types';
import { TranscriptUsagesResponse, TranscriptUsageGeneNamesResponse } from './types';
import { COLORS } from 'variables/transcriptViewerColors';

const SplicingEventsTable = ({ ...props }) => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();
  // Condition types for this current project
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  // Filters for the table
  const filters = useSelector((state: RootState) => state.transcriptUsageFilters);
  // Sort state for the table
  const [sortedOn, setSortedOn] = useState<{ field: string; order: -1 | 1 }>({
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

  const updateTable = ({ transcriptUsages, transcriptUsagesCount }: TranscriptUsagesResponse) => {
    const newRowCount = transcriptUsagesCount;
    setRowCount(newRowCount);

    const newTableData: string[][] = transcriptUsages.map(Object.values);
    setTableData(newTableData);

    setCurrentPage(0);

    if (transcriptUsages.length === 0) return;

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [gene, transcript] = firstRow;
    dispatch(selectTranscriptUsage(gene, transcript));
    dispatch(selectTranscriptViewerTranscript(transcript));
  };

  // Refetch and update on filters change
  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/transcript-usages', {
      project,
      skip: 0,
      filters,
      sortedOn,
    }).then((res: TranscriptUsagesResponse) => {
      if (!isMounted || !res) return;

      updateTable(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, filters]);

  // Refetch and update on sort
  // Don't run on first render, avoids double fetching
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/transcript-usages', {
      project,
      skip: 0,
      filters,
      sortedOn,
    }).then((res: TranscriptUsagesResponse) => {
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

  // Fetch more if needed on page change
  const handlePageChange = async (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    setCurrentPage(page);

    const skip = page * rowsPerPage;
    const haveToFetchMore = tableData.length <= skip;

    if (!haveToFetchMore) return;

    setLoading(true);

    const { transcriptUsages }: TranscriptUsagesResponse = await fetchFromApi('/api/transcript-usages', {
      project,
      skip,
      filters,
      sortedOn,
    });

    setTableData([...tableData, ...transcriptUsages.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  // Dispatching color also to match colors to other charts
  const selectTranscriptUsageOnClick = (row: string[]) => {
    setSelectedRow(row);
    const [gene, transcript] = row;
    dispatch(selectTranscriptUsage(gene, transcript));
    dispatch(selectTranscriptViewerTranscript(transcript));
    dispatch(selectTranscriptViewerTranscriptColor(COLORS[0]));
  };

  // Search filter
  const fetchSingleSelectOptions = async (inputValue: string) => {
    const geneNames: TranscriptUsageGeneNamesResponse = await fetchFromApi(
      '/api/transcript-usages/gene-names',
      {
        project,
        searchInput: inputValue,
      }
    );

    return geneNames.map((name) => ({ value: name._id, label: name._id }));
  };

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    const gene = selectedOption ? selectedOption.value : '';
    dispatch(setTranscriptUsageFilters({ ...filters, gene }));
  };

  // P value filter
  const pValueMarks = ['0.001', '0.01', '0.05', '0.1', '1'];
  const onPValueChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMaxPValueFilterValue = parseFloat(pValueMarks[value]);

    if (newMaxPValueFilterValue === filters.maxPValue) return;

    dispatch(setTranscriptUsageFilters({ ...filters, maxPValue: newMaxPValueFilterValue }));
  };

  // Converts condition types into ['cond1-cond2', 'cond3-cond4'] etc.
  const versusConditionTypes = makeVersusConditionTypes(conditionTypes);

  // Button on the right of the row
  // row prop will come from the table component's row and it's the values for that roww
  const RowContentRight = ({ row }: { row: string[] }) => {
    const [gene] = row;

    const history = useHistory();

    const handleClick = () => {
      dispatch(setGeneBrowserFilters({ gene, minTPM: 0, minQual: 0 }));
      history.push(history.location.pathname.replace('transcript-usage', 'gene-browser'));
    };

    return (
      <img
        className={classes.goToGeneBrowserIcon}
        src={Category3}
        onClick={handleClick}
        alt='See on gene browser'
        title='See on gene browser'
      />
    );
  };

  return (
    <ProjectItemCard className={classes.container} name='Transcript Usage' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          options={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
          defaultInputValue={filters.gene}
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
        <DiscreteSlider
          name='Max. p value'
          defaultValue={pValueMarks.findIndex((mark) => parseFloat(mark) === filters.maxPValue)}
          marks={parseDiscreteSliderMarks(pValueMarks)}
          onChangeCommited={onPValueChangeCommited}
        />
      </div>
      <Table
        tableData={tableData}
        tableHead={['Gene', 'Transcript', 'dPSI', 'Adj. p value', 'Transcripts']}
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
        RowContentRight={RowContentRight}
      />
    </ProjectItemCard>
  );
};

export default SplicingEventsTable;
