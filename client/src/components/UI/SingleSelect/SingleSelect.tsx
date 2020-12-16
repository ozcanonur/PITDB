import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { SingleSelectProps } from './types';
import { searchStyles } from 'components/UI/MultiSelect/styles/multiSelect';

const { DropdownIndicator } = components;

const CustomDropdownIndicator = ({ ...props }: any) => {
  const clearValue = () => {
    props.clearValue();
  };

  return (
    <>
      <ClearIcon
        style={{ fontSize: '1.8rem', color: 'rgba(51, 51, 102, 0.85)', marginRight: '0.5rem' }}
        onClick={clearValue}
      />
      <DropdownIndicator {...props}>
        <SearchIcon style={{ fontSize: '1.8rem' }} />
      </DropdownIndicator>
    </>
  );
};

const SingleSelect = ({ singleSelectProps, name, options, onChange, ...props }: SingleSelectProps) => {
  const filterValues = (inputValue: string) =>
    options.filter((e) => e.label.toLowerCase().includes(inputValue.toLowerCase()));

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
        onChange={onChange}
        escapeClearsValue
        isClearable
        {...singleSelectProps}
      />
    </div>
  );
};

export default SingleSelect;
