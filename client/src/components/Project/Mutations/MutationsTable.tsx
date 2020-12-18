import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';

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
  const [filters, setFilters] = useState<{ type: string[]; inCDS: boolean[]; hasPeptideEvidence: boolean[] }>({
    type: ['SNP'],
    inCDS: [true],
    hasPeptideEvidence: [false],
  });

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

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    Promise.all([
      fetchFromApi('/api/mutations', { projectId, onlyCount: true, filters: filters as any }),
      fetchFromApi('/api/mutations', { projectId, skip: 0, filters: filters as any }),
    ]).then(([resCount, resMutations]) => {
      if (!mounted || !resCount || !resMutations) return;

      setRowCount(parseInt(resCount));
      setTableData(resMutations.map(Object.values));
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, filters]);

  const multiSelectChange = (selectedOptions: SelectOption[], actionMeta: ActionMeta<any>) => {
    const multiSelectName = actionMeta.name as string;
    const newSelectedValues = (selectedOptions || []).map((option) => option.value).map((option) => option.toString());

    setFilters({ ...filters, [multiSelectName]: newSelectedValues });
  };

  return (
    <ProjectItemCard className={classes.container} name='Mutations Table'>
      <div className={classes.filtersContainer}>
        <MultiSelect
          name='Type'
          options={[
            { value: 'SNP', label: 'SNP' },
            { value: 'DEL', label: 'DEL' },
            { value: 'INS', label: 'INS' },
          ]}
          defaultValues={['SNP']}
          onChange={multiSelectChange}
          className={classes.multiSelect}
        />
        <MultiSelect
          name='In CDS'
          options={[
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ]}
          defaultValues={['true']}
          onChange={multiSelectChange}
          className={classes.multiSelect}
        />
        <MultiSelect
          name='Peptide evidence'
          options={[
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ]}
          defaultValues={['false']}
          onChange={multiSelectChange}
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
          // 'Prot ref',
          // 'Prot alt',
          // 'Synonymous',
          'In CDS',
          'Peptide Evidence',
        ]}
        currentPage={currentPage}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
        loading={loading}
        tableProps={{ className: classes.table }}
        className={classes.tableContainer}
      />
    </ProjectItemCard>
  );
};

export default MutationsTable;

// const filters: Filter[] = [
//   {
//     type: 'MultiSelect',
//     onIndex: 2,
//     name: 'Type',
//     options: [
//       {
//         value: 'SNP',
//         label: 'SNP',
//       },
//       {
//         value: 'INS',
//         label: 'INS',
//       },
//       {
//         value: 'DEL',
//         label: 'DEL',
//       },
//     ],
//     defaultValues: ['SNP', 'INS'],
//   },
//   {
//     type: 'MultiSelect',
//     onIndex: 5,
//     name: 'In CDS',
//     options: [
//       {
//         value: 'false',
//         label: 'false',
//       },
//       {
//         value: 'true',
//         label: 'true',
//       },
//     ],
//     defaultValues: ['false'],
//   },
//   {
//     type: 'MultiSelect',
//     onIndex: 6,
//     name: 'Peptide Evidence',
//     options: [
//       {
//         value: 'false',
//         label: 'false',
//       },
//       {
//         value: 'true',
//         label: 'true',
//       },
//     ],
//     defaultValues: ['false'],
//   },
// ];
