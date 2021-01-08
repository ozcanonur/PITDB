import React, { useState, Children } from 'react';
import Select, { components } from 'react-select';
import usePortal from 'react-useportal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClearIcon from '@material-ui/icons/Clear';

import { MultiSelectProps } from './types';
import { selectStyles } from './styles';

const {
  ValueContainer,
  Placeholder,
  MultiValueContainer,
  Menu,
  DropdownIndicator,
  MultiValueRemove,
  MultiValue,
  Option,
  Control,
} = components;

const CustomValueContainer = ({ children, ...props }: any) => (
  <ValueContainer {...props}>
    <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
    {Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
  </ValueContainer>
);

const CustomMultiValueContainer = (renderOn: HTMLElement | null) => {
  return ({ children, ...props }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Portal } = usePortal({
      bindTo: renderOn || undefined,
    });

    if (!renderOn) return null;

    return (
      <Portal>
        <MultiValueContainer {...props} data-test='multiValueContainer'>
          {Children.map(children, (child) => child)}
        </MultiValueContainer>
      </Portal>
    );
  };
};

const CustomMenu = ({ ...props }: any) => (
  <Menu {...props} data-test={`${props.selectProps.name}-menu`} className='menu' />
);

const CustomDropdownIndicator = (props: any) => (
  <DropdownIndicator {...props} data-test={`${props.selectProps.name}-dropdown`}>
    <ArrowDropDownIcon style={{ fontSize: '2.4rem' }} />
  </DropdownIndicator>
);

const CustomMultiValueRemove = (props: any) => (
  <MultiValueRemove {...props} data-test={`${props.data.value}-removeButton`}>
    <ClearIcon />
  </MultiValueRemove>
);

const CustomMultiValue = (props: any) => (
  <MultiValue {...props} data-test={`${props.children}-multiValue`}>
    {props.children}
  </MultiValue>
);

const CustomOption = (props: any) => (
  <Option {...props} data-test={`${props.children}-option`}>
    {props.children}
  </Option>
);

const CustomControl = (props: any) => (
  <Control {...props} data-test={`${props.selectProps.name}-multiSelectControl`}>
    {props.children}
  </Control>
);

const MultiSelect = ({
  multiSelectProps,
  name,
  options,
  onChange,
  defaultValues,
  ...props
}: MultiSelectProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

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
      <Select
        name={name}
        components={{
          ValueContainer: CustomValueContainer,
          MultiValueContainer: CustomMultiValueContainer(ref),
          DropdownIndicator: CustomDropdownIndicator,
          Menu: CustomMenu,
          MultiValueRemove: CustomMultiValueRemove,
          MultiValue: CustomMultiValue,
          Option: CustomOption,
          Control: CustomControl,
        }}
        closeMenuOnSelect={false}
        isMulti
        hideSelectedOptions={false}
        options={options}
        styles={selectStyles}
        onChange={onChange}
        placeholder={name}
        defaultValue={defaultValues?.map((e) => ({ value: e, label: e }))}
        isClearable
        controlShouldRenderValue
        blurOnRemove
        aria-label={`${name} multi-select`}
        // For menu close animation
        id={uniqueId}
        onMenuClose={onMenuClose}
        {...multiSelectProps}
      />
      <div ref={(node) => setRef(node)} />
    </div>
  );
};

export default MultiSelect;
