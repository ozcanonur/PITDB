import { ActionMeta, OptionsType, ValueType } from 'react-select';

export interface SingleSelectProps {
  name: string;
  options: OptionsType<any>;
  onChange?: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  singleSelectProps?: any;
  className?: string;
}
