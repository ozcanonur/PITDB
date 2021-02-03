import { Fragment } from 'react';
import numeral from 'numeral';

import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { TableRowProps } from './types';
import { useStyles } from './styles';

const formatCellValue = (value: any) => {
  if (value === true) return <DoneIcon style={{ color: '#489c48', verticalAlign: 'middle' }} />;
  else if (value === false) return <CloseIcon style={{ color: '#8c041f', verticalAlign: 'middle' }} />;
  else if (isNaN(value)) return String(value);
  else if (value % 1 === 0) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  else return numeral(value).format('0.000e+0');
};

const Row = ({ row, rowOnClick, selectedRow, RowContentRight }: TableRowProps) => {
  const classes = useStyles();

  return (
    <TableRow
      className={classes.tableBodyRow}
      onClick={rowOnClick ? () => rowOnClick(row) : undefined}
      style={{
        cursor: rowOnClick ? 'pointer' : 'inherit',
        backgroundColor: row === selectedRow ? 'rgba(51, 51, 102, 0.1)' : 'transparent',
      }}
    >
      {row.map((value, index) => (
        <Fragment key={index}>
          <TableCell className={classes.tableCell}>{formatCellValue(value)}</TableCell>
          {index === row.length - 1 && RowContentRight ? (
            <TableCell className={`${classes.tableCell} ${classes.tableCellRowContentRight}`}>
              <RowContentRight row={row} />
            </TableCell>
          ) : null}
        </Fragment>
      ))}
    </TableRow>
  );
};

export default Row;
