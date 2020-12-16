import { ChangeEvent } from 'react';
import { ActionMeta, OptionsType, ValueType } from 'react-select';

export interface ExtendedTableProps {
  tableData: string[][];
  tableHead: string[];
  clickableCells?: {
    [key: string]: (name: string) => void;
  };
  filters?: Filter[];
}

export interface FilterTableBy {
  [filterName: string]: string | string[] | [number, number] | null;
}

export interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndexes?: number[];
  defaultValues?: [number, number];
  onIndex: number;
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}

export interface FiltersProps {
  filters?: Filter[];
  onSingleSelectChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>, onIndex: number) => void;
  multiSelectOnChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>, onIndex: number) => void;
  onSliderChangeCommited: (_event: ChangeEvent<{}>, values: [number, number], onIndex: number) => void;
  initialFilterValues: FilterTableBy;
}
