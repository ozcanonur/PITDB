import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { useStyles } from './styles/table';

interface Props {
  content: string[];
  handleSort: (x: number) => void;
}

const TableHead = ({ content, handleSort }: Props) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableHeadRow}>
      {content.map((e, key) => (
        <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`} key={e} onClick={() => handleSort(key)}>
          {e}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHead;
