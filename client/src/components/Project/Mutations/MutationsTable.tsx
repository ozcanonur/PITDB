import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Table from 'components/UI/Table/Table';

import { fetchFromApi } from 'utils';

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem',
    minWidth: '76rem',
    maxWidth: '76rem',
  },
  table: {
    minHeight: '49rem',
  },
}));

const MutationsTable = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const handlePageChange = async (_event: any, page: number) => {
    setCurrentPage(page);

    const skip = page * 10;
    const haveToFetchMore = tableData.length <= skip;

    if (haveToFetchMore) {
      setLoading(true);

      const newMutations = await fetchFromApi('/api/mutations', { projectId, skip });
      setTableData([...tableData, ...newMutations.map(Object.values)]);

      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    Promise.all([
      fetchFromApi('/api/mutationsCount', { projectId }),
      fetchFromApi('/api/mutations', { projectId, skip: 50 }),
      // @ts-ignore
    ]).then(([resCount, resMutations]) => {
      if (mounted && resCount && resMutations) {
        setRowCount(parseInt(resCount));
        setTableData(resMutations.map(Object.values));
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [projectId]);

  return (
    <div className={classes.container}>
      <Table
        tableData={tableData}
        tableHead={['Gene', 'Position', 'Type', 'Ref', 'Alt', 'In CDS', 'Peptide Evidence']}
        currentPage={currentPage}
        rowCount={rowCount}
        handlePageChange={handlePageChange}
        loading={loading}
        tableProps={{ className: classes.table }}
      />
    </div>
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
