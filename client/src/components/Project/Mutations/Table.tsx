import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
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

const MutationsTable = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();

  const [tableData, setTableData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const filters = useSelector((state: RootState) => state.mutationFilters);

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    fetchFromApi('/api/mutations', { projectId, skip: 0, filters: filters as any }).then((res) => {
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

      const newTableData = mutations.map(Object.values);
      setTableData(newTableData);

      const firstRow = newTableData[0];
      setSelectedRow(firstRow);

      const [gene, position] = firstRow;
      dispatch(selectMutation(gene, position));

      setCurrentPage(0);

      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, filters, dispatch]);

  const handlePageChange = async (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    setCurrentPage(page);

    const skip = page * rowsPerPage;
    const haveToFetchMore = tableData.length <= skip;

    if (!haveToFetchMore) return;

    setLoading(true);

    const { mutations } = await fetchFromApi('/api/mutations', { projectId, skip, filters: filters as any });
    setTableData([...tableData, ...mutations.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectGeneOnClick = (row: string[]) => {
    setSelectedRow(row);
    dispatch(selectMutation(row[0], row[1]));
  };

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);

    dispatch(setMutationFilters({ ...filters, [name]: newSelectedValues }));
  };

  const fetchSingleSelectOptions = async (inputValue: string) =>
    await fetchFromApi('/api/mutations/geneNames', { projectId, searchInput: inputValue });

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender with the actual set filters via useEffect
    if (!selectedOption) {
      dispatch(setMutationFilters({ ...filters }));
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    fetchFromApi('/api/mutations/byGeneName', { projectId, geneName: selectedOption.value }).then((res) => {
      if (!res) return;

      const newRowCount = res.length;
      setRowCount(newRowCount);

      const newTableData = res.map(Object.values);
      setTableData(newTableData);
      setSelectedRow(newTableData[0]);
      setCurrentPage(0);

      setLoading(false);
    });
  };

  return (
    <ProjectItemCard className={classes.container} name='Mutations Table'>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          promiseOptions={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.multiSelectContainer}>
          <MultiSelect
            name='Type'
            options={[
              { value: 'SNP', label: 'SNP' },
              { value: 'DEL', label: 'DEL' },
              { value: 'INS', label: 'INS' },
            ]}
            defaultValues={['SNP']}
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
        tableHead={['Gene', 'Position', 'Type', 'Ref', 'Alt', 'In CDS', 'Peptide Evidence']}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        className={classes.tableContainer}
        rowOnClick={selectGeneOnClick}
        selectedRow={selectedRow}
      />
    </ProjectItemCard>
  );
};

export default MutationsTable;