import { OptionsType, ValueType, components, ActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';
import SearchIcon from '@material-ui/icons/Search';

import { searchStyles } from 'components/UI/MultiSelect/styles/multiSelect';

const { DropdownIndicator } = components;

interface Props {
  name: string;
  options: OptionsType<any>;
  onChange?: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  singleSelectProps?: any;
  className?: string;
}

const CustomDropdownIndicator = ({ ...props }: any) => {
  return (
    <DropdownIndicator {...props}>
      <SearchIcon style={{ fontSize: '1.8rem' }} />
    </DropdownIndicator>
  );
};

const SingleSelect = ({ singleSelectProps, name, options, onChange, ...props }: Props) => {
  const filterValues = (inputValue: string) => {
    return options.filter((e) => e.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterValues(inputValue));
      }, 1000);
    });

  return (
    <div {...props}>
      <AsyncSelect
        name={name}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        styles={searchStyles}
        placeholder={name}
        closeMenuOnSelect={false}
        {...singleSelectProps}
      />
    </div>
  );
};

export default SingleSelect;