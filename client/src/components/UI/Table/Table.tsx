import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import { TableProps } from './types';
import Row from './TableRow';
import CustomPaginationActions from './CustomPaginationActions';
import { useStyles } from './styles/table';

const CustomTable = ({ tableHead, tableData, clickableCells, rowCount, currentPage, handlePageChange }: TableProps) => {
  const classes = useStyles();

  const slicedTableData = tableData.slice(currentPage * 10, currentPage * 10 + 10);

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((e) => (
              <TableCell key={e} className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                {e}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedTableData.map((row, key) => (
            <Row key={key} row={row} clickableCells={clickableCells} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        classes={{
          root: classes.tablePagination,
          actions: classes.tablePagination,
          caption: classes.tablePagination,
          select: classes.tablePagination,
          menuItem: classes.tablePagination,
          selectIcon: classes.tablePaginationSelectIcon,
        }}
        className={classes.tablePagination}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component='div'
        count={rowCount}
        rowsPerPage={10}
        page={currentPage}
        onChangePage={handlePageChange}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={CustomPaginationActions}
      />
    </div>
  );
};

export default CustomTable;
