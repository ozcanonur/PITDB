import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { TableRowProps } from './types';
import { useStyles } from './styles/table';

const Row = ({ row, clickableCells, rowOnClick, selectedRow }: TableRowProps) => {
  const classes = useStyles();

  const isSelectedRow = row === selectedRow;

  return (
    <TableRow
      className={classes.tableBodyRow}
      onClick={rowOnClick ? () => rowOnClick(row) : undefined}
      style={{
        cursor: rowOnClick ? 'pointer' : 'inherit',
        backgroundColor: isSelectedRow ? 'rgba(51, 51, 102, 0.1)' : 'transparent',
      }}
    >
      {row.map((prop, key) => (
        <TableCell className={classes.tableCell} key={key}>
          {clickableCells && clickableCells[key] ? (
            <div onClick={() => clickableCells[key](prop)} className={classes.tableCellClickableContent}>
              {prop === '' ? prop : isNaN(prop as any) ? String(prop) : parseInt(String(prop)).toLocaleString()}
            </div>
          ) : prop === '' || isNaN(prop as any) || typeof prop === 'boolean' ? (
            String(prop)
          ) : parseFloat(prop) % 1 !== 0 ? (
            prop
          ) : (
            parseFloat(String(prop)).toLocaleString()
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default Row;
