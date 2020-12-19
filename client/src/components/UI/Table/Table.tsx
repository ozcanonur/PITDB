import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import Loading from 'components/UI/Loading/Loading';
import { TableProps } from './types';
import Row from './TableRow';
import CustomPaginationActions from './CustomPaginationActions';
import { useStyles } from './styles/table';

const CustomTable = ({
  tableHead,
  tableData,
  clickableCells,
  rowCount,
  rowsPerPage = 10,
  currentPage = 0,
  handleRowsPerPageChange,
  handlePageChange,
  loading,
  tableProps,
  rowOnClick,
  selectedRow,
  ...props
}: TableProps) => {
  const classes = useStyles();

  const slicedTableData = tableData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  return (
    <div className={classes.tableResponsive} {...props}>
      <Table className={classes.table} {...tableProps}>
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((e) => (
              <TableCell key={e} className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                {e}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <td className={classes.loadingContainer}>
                <Loading />
              </td>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {slicedTableData.map((row, key) => (
              <Row
                key={key}
                row={row}
                clickableCells={clickableCells}
                rowOnClick={rowOnClick}
                selectedRow={selectedRow}
              />
            ))}
          </TableBody>
        )}
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
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        ActionsComponent={CustomPaginationActions}
      />
    </div>
  );
};

export default CustomTable;
