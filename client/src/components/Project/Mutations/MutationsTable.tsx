import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { MutationTableFilters } from './types';
import { useStyles } from './styles/mutationsTable';
import { fetchFromApi } from 'utils';

const MutationsTable = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();

  const [tableData, setTableData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [filters, setFilters] = useState<MutationTableFilters>({
    type: ['SNP'],
    inCDS: ['true'],
    hasPeptideEvidence: ['false'],
  });

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    Promise.all([
      fetchFromApi('/api/mutations/count', { projectId, filters: filters as any }),
      fetchFromApi('/api/mutations', { projectId, skip: 0, filters: filters as any }),
    ]).then(([resCount, resMutations]) => {
      if (!mounted || !resCount || !resMutations) return;

      const newRowCount = parseInt(resCount);
      setRowCount(newRowCount);

      const newTableData = resMutations.map(Object.values);
      setTableData(newTableData);
      setSelectedRow(newTableData[0]);

      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, filters]);

  const handlePageChange = async (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    setCurrentPage(page);

    const skip = page * rowsPerPage;
    const haveToFetchMore = tableData.length <= skip;

    if (!haveToFetchMore) return;

    setLoading(true);

    const newMutations = await fetchFromApi('/api/mutations', { projectId, skip, filters: filters as any });
    setTableData([...tableData, ...newMutations.map(Object.values)]);

    setLoading(false);
  };

  const handleRowsPerPageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
  };

  const selectGeneOnClick = (row: string[]) => {
    setSelectedRow(row);
  };

  const multiSelectOnChange = (selectedOptions: SelectOption[], _actionMeta: ActionMeta<any>, name: string) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);

    setFilters({ ...filters, [name]: newSelectedValues });
  };

  const fetchSingleSelectOptions = (inputValue: string) => {
    return new Promise((resolve) => {
      resolve(fetchFromApi('/api/mutations/geneNames', { projectId, searchInput: inputValue }));
    });
  };

  const singleSelectOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    // Just to trigger rerender with the actual set filters via useEffect
    if (!selectedOption) {
      setFilters({ ...filters });
      return;
    }

    setLoading(true);

    // WOOP, should we apply filters on search or not?
    Promise.all([
      fetchFromApi('/api/mutations/byGeneName/count', { projectId, geneName: selectedOption.value }),
      fetchFromApi('/api/mutations/byGeneName', { projectId, geneName: selectedOption.value }),
    ]).then(([resCount, resMutations]) => {
      if (!resCount || !resMutations) return;

      const newRowCount = parseInt(resCount);
      setRowCount(newRowCount);

      const newTableData = resMutations.map(Object.values);
      setTableData(newTableData);
      setSelectedRow(newTableData[0]);

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
        tableProps={{ className: classes.table }}
        className={classes.tableContainer}
        rowOnClick={selectGeneOnClick}
        selectedRow={selectedRow}
      />
    </ProjectItemCard>
  );
};

export default MutationsTable;
