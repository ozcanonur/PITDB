import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles/table';

interface Props {
  row: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
}

const Row = (props: Props) => {
  const { row, clickableCells } = props;

  const classes = useStyles();

  return (
    <TableRow className={classes.tableBodyRow}>
      {row.map((prop, key) => (
        <TableCell className={classes.tableCell} key={key}>
          {clickableCells && clickableCells[key] ? (
            <div onClick={() => clickableCells[key](prop)} className={classes.tableCellClickableContent}>
              {prop}
            </div>
          ) : (
            prop
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default Row;
