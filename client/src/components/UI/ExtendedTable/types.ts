import { OptionsType } from 'react-select';

export interface ExtendedTableProps {
  tableData: string[][];
  tableHead: string[];
  filters?: Filter[];
  isSortable?: Boolean;
  options?: OptionsType<any>;
  className?: string;
}

export interface FilterTableBy {
  [filterName: string]: string[] | [number, number] | null;
}

export interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValues?: [number, number] | string[];
  onIndex: number;
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}
