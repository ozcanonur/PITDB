import { MouseEvent, ChangeEvent, CSSProperties } from 'react';

export interface CustomPaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (_event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

export interface TableProps {
  tableHead: string[];
  tableData: string[][];
  currentPage?: number;
  rowsPerPage?: number;
  handleRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  handlePageChange: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  loading?: boolean;
  tableProps?: any;
  className?: string;
  rowOnClick?: (row: string[]) => void;
  selectedRow?: string[];
  sortedOn?: {
    field: string;
    order?: -1 | 1;
  };
  handleSort?: (field: string, currentOrder?: -1 | 1) => void;
}

export interface TableRowProps {
  row: string[];
  rowOnClick?: (row: string[]) => void;
  selectedRow?: string[];
  style?: CSSProperties;
}
