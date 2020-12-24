import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { SingleSelectProps } from './types';
import { singleSelectStyles } from './styles';

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
      <DropdownIndicator {...props} data-test='singleSelect-dropdown'>
        <SearchIcon style={{ fontSize: '1.8rem' }} />
      </DropdownIndicator>
    </>
  );
};

const CustomMenuList = (props: any) => (
  <MenuList {...props} data-test='singleSelect-menuList'>
    {props.children}
  </MenuList>
);

const CustomMenu = ({ ...props }: any) => <Menu {...props} data-test='menu' className='menu' />;

const SingleSelect = ({ singleSelectProps, name, promiseOptions, onChange, ...props }: SingleSelectProps) => {
  // const filterValues = (inputValue: string) =>
  //   options.filter((e) => e.label.toLowerCase().startsWith(inputValue.toLowerCase()));

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

  return (
    <div {...props}>
      <AsyncSelect
        name={name}
        components={{ DropdownIndicator: CustomDropdownIndicator, MenuList: CustomMenuList, Menu: CustomMenu }}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        styles={singleSelectStyles}
        placeholder={name}
        closeMenuOnSelect={false}
        onChange={onChange}
        escapeClearsValue
        isClearable
        blurInputOnSelect
        // menuIsOpen
        // For menu close animation
        id={uniqueId}
        onMenuClose={onMenuClose}
        {...singleSelectProps}
      />
    </div>
  );
};

export default SingleSelect;
