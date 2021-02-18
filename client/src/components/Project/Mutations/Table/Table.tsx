import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import Category3 from 'assets/category3.svg';

import { useStyles } from './styles';
import { fetchFromApi } from 'utils';
import {
  selectMutation,
  setMutationFilters,
  setGeneBrowserFilters,
  setGeneBrowserScrollJumpPosition,
} from 'actions';
import { MutationsResponse, GeneNamesResponse } from './types';
import { SelectOption } from 'components/UI/MultiSelect/types';

const MutationsTable = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();

  const filters = useSelector((state: RootState) => state.mutationFilters);
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

  const updateTable = ({ mutations, mutationsCount }: MutationsResponse) => {
    const newRowCount = mutationsCount;
    setRowCount(newRowCount);

    const newTableData = mutations.map(Object.values);
    setTableData(newTableData);

    setCurrentPage(0);

    if (mutations.length === 0) return;

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [gene, position] = firstRow;
    dispatch(selectMutation(gene, position));
  };

  // Refetch on filters change
  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetchFromApi('/api/mutations', {
      project,
      skip: 0,
      filters,
      sortedOn,
    }).then((res: MutationsResponse) => {
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
    fetchFromApi('/api/mutations', {
      project,
      skip: 0,
      filters,
      sortedOn,
    }).then((res: MutationsResponse) => {
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

    const { mutations }: MutationsResponse = await fetchFromApi('/api/mutations', {
      project,
      skip,
      filters,
      sortedOn,
    });

    setLoading(false);

    setTableData([...tableData, ...mutations.map(Object.values)]);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectGeneOnClick = (row: string[]) => {
    setSelectedRow(row);
    const [gene, position] = row;
    dispatch(selectMutation(gene, position));
  };

  const multiSelectOnChange = (
    selectedOptions: SelectOption[],
    _actionMeta: ActionMeta<any>,
    name: string
  ) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);
    dispatch(setMutationFilters({ ...filters, [name]: newSelectedValues }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) => {
    const geneNames: GeneNamesResponse = await fetchFromApi('/api/mutations/gene-names', {
      project,
      searchInput: inputValue,
    });

    return geneNames.map((name) => ({ value: name._id, label: name._id }));
  };

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    const gene = selectedOption ? selectedOption.value : '';
    dispatch(setMutationFilters({ ...filters, gene }));
  };

  // Button on the right of the row
  // row prop will come from the table component's row
  const RowContentRight = ({ row }: { row: string[] }) => {
    const [gene, position] = row;

    const history = useHistory();

    const handleClick = () => {
      dispatch(setGeneBrowserFilters({ gene, minTPM: 0, minQual: 0 }));
      // -3 to make mutation to not be completely aligned to the left
      // Since gene browser position is based on the left most index
      dispatch(setGeneBrowserScrollJumpPosition(parseInt(position) - 3, true));
      history.push(history.location.pathname.replace('mutations', 'gene-browser'));
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
    <ProjectItemCard className={classes.container} name='Mutations' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          options={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
          defaultInputValue={filters.gene}
        />
        {/* <MultiSelect
            name='Synonymous'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['true', 'false']}
            onChange={(selectedOptions, _actionMeta) =>
              multiSelectOnChange(selectedOptions, _actionMeta, 'isSynonymous')
            }
            className={classes.multiSelect}
          /> */}
        <MultiSelect
          name='Type'
          options={[
            { value: 'SNP', label: 'SNP' },
            { value: 'DEL', label: 'DEL' },
            { value: 'INS', label: 'INS' },
          ]}
          defaultValues={filters.variantType}
          onChange={(selectedOptions, _actionMeta) =>
            multiSelectOnChange(selectedOptions, _actionMeta, 'variantType')
          }
          className={classes.multiSelect}
        />
        <MultiSelect
          name='In CDS'
          options={[
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ]}
          defaultValues={filters.inCDS}
          onChange={(selectedOptions, _actionMeta) =>
            multiSelectOnChange(selectedOptions, _actionMeta, 'inCDS')
          }
          className={classes.multiSelect}
        />
        <MultiSelect
          name='Peptide evidence'
          options={[
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ]}
          defaultValues={filters.hasPeptideEvidence}
          onChange={(selectedOptions, _actionMeta) =>
            multiSelectOnChange(selectedOptions, _actionMeta, 'hasPeptideEvidence')
          }
          className={classes.multiSelect}
        />
      </div>
      <Table
        tableData={tableData}
        tableHead={[
          'Gene',
          'Position',
          'Type',
          'Ref',
          'Alt',
          'Synonymous',
          'In CDS',
          'Peptide evidence',
          'Transcripts',
        ]}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        className={classes.tableContainer}
        rowOnClick={selectGeneOnClick}
        selectedRow={selectedRow}
        sortedOn={sortedOn}
        handleSort={handleSort}
        RowContentRight={RowContentRight}
      />
    </ProjectItemCard>
  );
};

export default MutationsTable;
