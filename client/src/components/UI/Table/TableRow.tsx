import numeral from 'numeral';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { TableRowProps } from './types';
import { useStyles } from './styles';

const formatCellValue = (value: any) => {
  if (isNaN(value)) return String(value);
  else if (value % 1 === 0) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  else return numeral(value).format('0.000e+0');
};

const Row = ({ row, rowOnClick, selectedRow }: TableRowProps) => {
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
      {row.map((value, key) => (
        <TableCell className={classes.tableCell} key={key}>
          {formatCellValue(value)}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default Row;
