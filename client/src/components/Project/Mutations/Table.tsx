import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { useStyles } from './styles/table';
import { fetchFromApi } from 'utils';
import { selectMutation, setMutationFilters } from 'actions';

const MutationsTable = ({ ...props }) => {
  const classes = useStyles();
  const { project } = useParams<{ project: string }>();
  const filters = useSelector((state: RootState) => state.mutationFilters);
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

  const fetchNewMutations = async (mounted: boolean) => {
    setLoading(true);

    const res = await fetchFromApi('/api/mutations', {
      project,
      skip: 0,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });

    if (!mounted || !res) return;

    const { mutations, mutationsCount } = res;

    if (mutations.length === 0) {
      setTableData([]);
      setRowCount(0);
      setCurrentPage(0);
      setLoading(false);
      return;
    }

    const newRowCount = parseInt(mutationsCount);
    setRowCount(newRowCount);

    const newTableData: string[][] = mutations.map(Object.values);
    setTableData(newTableData);

    const firstRow = newTableData[0];
    setSelectedRow(firstRow);

    const [gene, position] = firstRow;
    dispatch(selectMutation(gene, position));

    setCurrentPage(0);

    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    fetchNewMutations(mounted);

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

    fetchNewMutations(mounted);

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

    const { mutations } = await fetchFromApi('/api/mutations', {
      project,
      skip,
      filters: filters as any,
      sortedOn: sortedOn as any,
    });
    setTableData([...tableData, ...mutations.map(Object.values)]);

    setLoading(false);
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

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);
    dispatch(setMutationFilters({ ...filters, [name]: newSelectedValues }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) =>
    await fetchFromApi('/api/mutations/gene-names', { project, searchInput: inputValue });

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender with the actual set filters via useEffect
    if (!selectedOption) {
      dispatch(setMutationFilters({ ...filters }));
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    fetchFromApi('/api/mutations/by-gene-name', { project, geneName: selectedOption.value }).then((res) => {
      if (!res) return;

      const newRowCount = res.length;
      setRowCount(newRowCount);

      const newTableData = res.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(firstRow);

      const [gene, position] = firstRow;
      dispatch(selectMutation(gene, position));
      setCurrentPage(0);

      setLoading(false);
    });
  };

  return (
    <ProjectItemCard className={classes.container} name='Mutations' {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          promiseOptions={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.multiSelectContainer}>
          <MultiSelect
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
          />
          <MultiSelect
            name='Type'
            options={[
              { value: 'SNP', label: 'SNP' },
              { value: 'DEL', label: 'DEL' },
              { value: 'INS', label: 'INS' },
            ]}
            defaultValues={['SNP', 'DEL', 'INS']}
            onChange={(selectedOptions, _actionMeta) => multiSelectOnChange(selectedOptions, _actionMeta, 'type')}
            className={classes.multiSelect}
          />
          <MultiSelect
            name='In CDS'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['true']}
            onChange={(selectedOptions, _actionMeta) => multiSelectOnChange(selectedOptions, _actionMeta, 'inCDS')}
            className={classes.multiSelect}
          />
          <MultiSelect
            name='Peptide evidence'
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            defaultValues={['false']}
            onChange={(selectedOptions, _actionMeta) =>
              multiSelectOnChange(selectedOptions, _actionMeta, 'hasPeptideEvidence')
            }
            className={classes.multiSelect}
          />
        </div>
      </div>
      <Table
        tableData={tableData}
        tableHead={['Gene', 'Position', 'Type', 'Ref', 'Alt', 'Synonymous', 'In CDS', 'Peptide evidence']}
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
      />
    </ProjectItemCard>
  );
};

export default MutationsTable;
