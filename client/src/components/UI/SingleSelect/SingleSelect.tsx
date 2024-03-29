import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import debounce from 'debounce-promise';

import { SingleSelectProps } from './types';
import { singleSelectStyles } from './styles';
import { useEffect, useState } from 'react';

const { DropdownIndicator, MenuList, Menu } = components;

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

const CustomMenuList = (props: any) => <MenuList {...props}>{props.children}</MenuList>;

const CustomMenu = ({ ...props }: any) => <Menu {...props} className='menu' />;

const SingleSelect = ({
  singleSelectProps,
  name,
  options,
  onChange,
  defaultInputValue,
  isAsync = true,
  ...props
}: SingleSelectProps) => {
  const [initialValue, setInitialValue] = useState(name);

  useEffect(() => {
    if (!defaultInputValue) return;

    setInitialValue(defaultInputValue);
  }, [defaultInputValue]);

  // For menu close animation
  const uniqueId = 'select_' + Math.random().toFixed(5).slice(2);
  const onMenuClose = () => {
    const menuEl = document.querySelector(`#${uniqueId} .menu`);
    const containerEl = menuEl?.parentElement;
    const clonedMenuEl = menuEl?.cloneNode(true);

    if (!clonedMenuEl) return;

    // @ts-ignore
    clonedMenuEl.classList.add('menu--close');
    clonedMenuEl.addEventListener('animationend', () => {
      containerEl?.removeChild(clonedMenuEl);
    });

    containerEl?.appendChild(clonedMenuEl!);
  };

  const debouncedOptions = debounce(options, 250);

  return (
    <div {...props}>
      {isAsync ? (
        <AsyncSelect
          name={name}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
            MenuList: CustomMenuList,
            Menu: CustomMenu,
          }}
          loadOptions={debouncedOptions}
          value={initialValue ? { value: initialValue, label: initialValue } : null}
          styles={singleSelectStyles}
          placeholder={name}
          closeMenuOnSelect={false}
          onChange={(value, action) => {
            if (!value) setInitialValue('');
            onChange(value, action);
          }}
          escapeClearsValue
          isClearable
          blurInputOnSelect
          defaultInputValue={defaultInputValue}
          aria-label={`${name} single-select`}
          // For menu close animation
          id={uniqueId}
          onMenuClose={onMenuClose}
          {...singleSelectProps}
        />
      ) : (
        <Select
          name={name}
          components={{
            MenuList: CustomMenuList,
            Menu: CustomMenu,
          }}
          value={{ value: initialValue, label: initialValue }}
          aria-label={`${name} single-select`}
          styles={singleSelectStyles}
          options={options.map((option: string) => ({ value: option, label: option }))}
          placeholder={name}
          onChange={onChange}
          // For menu close animation
          id={uniqueId}
          onMenuClose={onMenuClose}
        />
      )}
    </div>
  );
};

export default SingleSelect;
