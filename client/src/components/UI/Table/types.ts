import React from 'react';

export interface CustomPaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

export interface TableProps {
  tableHead: string[];
  tableData: string[][];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  currentPage: number;
  rowCount: number;
  handlePageChange: (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

export interface TableRowProps {
  row: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
}
