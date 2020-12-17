import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ExtendedTable from 'components/UI/ExtendedTable/ExtendedTable';
import { Filter } from 'components/UI/ExtendedTable/types';

import { fetchFromApi } from 'utils';

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem',
    minWidth: '76rem',
    maxWidth: '76rem',
  },
}));

const MutationsTable = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();

  const [tableData, setTableData] = useState<string[][]>([]);

  useEffect(() => {
    let mounted = true;
    fetchFromApi('/api/mutations', { projectId }).then((res) => {
      if (mounted && res) setTableData(res.map(Object.values));
    });

    return () => {
      mounted = false;
    };
  }, [projectId]);

  // console.log(tableData);

  const filters: Filter[] = [
    {
      type: 'MultiSelect',
      onIndex: 2,
      name: 'Type',
      options: [
        {
          value: 'SNP',
          label: 'SNP',
        },
        {
          value: 'INS',
          label: 'INS',
        },
        {
          value: 'DEL',
          label: 'DEL',
        },
      ],
      defaultValues: ['SNP', 'INS'],
    },
    {
      type: 'MultiSelect',
      onIndex: 5,
      name: 'In CDS',
      options: [
        {
          value: 'false',
          label: 'false',
        },
        {
          value: 'true',
          label: 'true',
        },
      ],
      defaultValues: ['false'],
    },
    {
      type: 'MultiSelect',
      onIndex: 6,
      name: 'Peptide Evidence',
      options: [
        {
          value: 'false',
          label: 'false',
        },
        {
          value: 'true',
          label: 'true',
        },
      ],
      defaultValues: ['false'],
    },
  ];

  return (
    <div className={classes.container}>
      <ExtendedTable
        tableData={tableData}
        tableHead={['Gene', 'Position', 'Type', 'Ref', 'Alt', 'In CDS', 'Peptide Evidence']}
        isSortable={false}
        filters={filters}
      />
    </div>
  );
};

export default MutationsTable;
