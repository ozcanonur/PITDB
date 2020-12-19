import { ActionMeta, ValueType } from 'react-select';

export interface SingleSelectProps {
  name: string;
  promiseOptions: any;
  onChange?: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  singleSelectProps?: any;
  className?: string;
}
