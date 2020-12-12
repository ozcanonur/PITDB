import { useState, useEffect } from 'react';
import range from 'lodash/range';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from './styles/table';
import Row from './TableRow';
import Head from './TableHead';

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

  /*-------------------------*/
  // Sorting, WOOP, sort state
  // Currently displayed values, filtered by the search field
  const createSortState = () => {
    let { length } = tableHead;

    const obj = {};
    range(0, length).forEach((x) => {
      // @ts-ignore
      if (x === 0) obj[x] = true;
      // @ts-ignore
      else obj[x] = false;
    });

    return obj;
  };

  // Sort state
  const [sortedAsc, setSortedAsc] = useState<{ [key: string]: boolean }>(createSortState());

  const handleSort = (key: number) => {
    // Check which order we need to sort
    const sortingOrder = sortedAsc[key] ? 1 : -1;
    let sortedList = [];
    sortedList = filteredList.sort((x, y) => {
      // Check if the column values are number or string
      // @ts-ignore
      const first = isNaN(x[key]) ? x[key] : parseFloat(x[key]);
      // @ts-ignore
      const second = isNaN(y[key]) ? y[key] : parseFloat(y[key]);
      if (first < second) return sortingOrder;
      if (first > second) return -1 * sortingOrder;
      return 0;
    });

    setFilteredList([...sortedList]);
    setSortedAsc({ ...sortedAsc, [key]: !sortedAsc[key] });
  };

  const slicedTableData = filteredList.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead>
          <Head content={tableHead} handleSort={handleSort} />
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
        }}
        className={classes.tablePagination}
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={filteredList.length > 0 ? currentPage : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
