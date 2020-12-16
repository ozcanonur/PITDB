import { ActionMeta, OptionsType, ValueType } from 'react-select';

export interface MultiSelectProps {
  name: string;
  options: OptionsType<any>;
  onChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  multiSelectProps?: any;
  defaultValues?: string[];
  className?: string;
}
