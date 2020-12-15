import React, { useState } from 'react';
import Select, { OptionsType, ValueType, components, ActionMeta } from 'react-select';
import usePortal from 'react-useportal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { selectStyles } from './styles/multiSelect';

const { ValueContainer, Placeholder, MultiValueContainer, Menu, DropdownIndicator } = components;

interface Props {
  name: string;
  options: OptionsType<any>;
  onChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  multiSelectProps?: any;
  defaultValueIndexes?: number[];
  className?: string;
}

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const CustomMultiValueContainer = (renderOn: HTMLElement | null) => {
  return ({ children, ...props }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Portal } = usePortal({
      bindTo: renderOn || undefined,
    });

    if (!renderOn) return null;

    return (
      <Portal>
        <MultiValueContainer {...props}>{React.Children.map(children, (child) => child)}</MultiValueContainer>
      </Portal>
    );
  };
};

const CustomMenu = ({ ...props }: any) => <Menu {...props} className='menu' />;

const CustomDropdownIndicator = ({ ...props }: any) => {
  return (
    <DropdownIndicator {...props}>
      <ArrowDropDownIcon style={{ fontSize: '2.4rem' }} />
    </DropdownIndicator>
  );
};

const MultiSelect = ({ multiSelectProps, name, options, onChange, defaultValueIndexes, ...props }: Props) => {
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
        }}
        closeMenuOnSelect={false}
        isMulti
        hideSelectedOptions={false}
        options={options}
        styles={selectStyles}
        onChange={onChange}
        placeholder={name}
        defaultValue={
          defaultValueIndexes !== undefined ? defaultValueIndexes.map((index) => options[index]) : undefined
        }
        isClearable
        controlShouldRenderValue
        blurOnRemove
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
