import { useState, useEffect } from 'react';
import range from 'lodash/range';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import CustomPaginationActions from './CustomPaginationActions';
import { useStyles } from './styles/table';
import Row from './TableRow';

interface Props {
  tableHead: string[];
  tableData: string[][];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
}

const CustomTable = (props: Props) => {
  const classes = useStyles();

  const { tableHead, tableData, clickableCells } = props;

  const [filteredList, setFilteredList] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setFilteredList(tableData);
  }, [tableData]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // On page change
  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setCurrentPage(page);
  };

  // Currently displayed values, filtered by the search field
  const createSortState = () => {
    const newSortState: { [key: string]: -1 | 0 | 1 } = {};
    range(0, tableHead.length).forEach((e) => {
      newSortState[e] = 0;
    });

    return newSortState;
  };

  // Sort state
  const [sortState, setSortState] = useState<{ [key: string]: -1 | 0 | 1 }>(createSortState());

  const handleSort = (key: number) => {
    // Check which order we need to sort
    const sortingOrder = sortState[key] < 1 ? 1 : -1;
    let sortedList = [];
    sortedList = filteredList.sort((x, y) => {
      // Check if the column values are number or string
      const first = isNaN(x[key] as any) ? x[key] : parseFloat(x[key]);
      const second = isNaN(y[key] as any) ? y[key] : parseFloat(y[key]);
      if (first < second) return sortingOrder;
      if (first > second) return -1 * sortingOrder;
      return 0;
    });

    setFilteredList([...sortedList]);

    Object.keys(sortState).forEach((e) => {
      if (parseInt(e) === key) {
        if (sortState[key] === 0) sortState[key] = 1;
        else sortState[key] = (sortState[key] * -1) as -1 | 0 | 1;
      } else sortState[e] = 0;
    });

    setSortState({ ...sortState });
  };

  const slicedTableData = filteredList.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((e, key) => (
              <TableCell
                key={e}
                className={`${classes.tableCell} ${classes.tableHeadCell}`}
                onClick={() => handleSort(key)}
              >
                {e}
                {sortState[key] === 1 ? (
                  <ArrowDropDownIcon className={classes.sortDropdown} />
                ) : sortState[key] === -1 ? (
                  <ArrowDropUpIcon className={classes.sortDropdown} />
                ) : null}
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
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={filteredList.length > 0 ? currentPage : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={CustomPaginationActions}
      />
    </div>
  );
};

export default CustomTable;
