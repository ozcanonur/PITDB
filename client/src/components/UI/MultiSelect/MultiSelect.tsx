import React, { useState } from 'react';
import Select, { OptionsType, ValueType, components, ActionMeta } from 'react-select';
import usePortal from 'react-useportal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { selectStyles } from './styles/multiSelect';

const { ValueContainer, Placeholder, MultiValueContainer, Menu, DropdownIndicator } = components;

interface Props {
  name: string;
  options: OptionsType<any>;
  onChange?: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  multiSelectProps?: any;
  defaultValueIndex?: number;
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

const CustomMenu = ({ ...props }: any) => <Menu {...props} className='multiSelectMenu' />;

const CustomDropdownIndicator = ({ ...props }: any) => {
  return (
    <DropdownIndicator {...props}>
      <ArrowDropDownIcon style={{ fontSize: '2.4rem' }} />
    </DropdownIndicator>
  );
};

const MultiSelect = ({ containerProps, multiSelectProps, name, options, onChange, defaultValueIndex }: Props) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <div {...containerProps}>
      <Select
        name={name}
        components={{
          ValueContainer: CustomValueContainer,
          MultiValueContainer: CustomMultiValueContainer(ref),
          Menu: CustomMenu,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        closeMenuOnSelect={false}
        isMulti
        hideSelectedOptions={false}
        options={options}
        styles={selectStyles}
        onChange={onChange}
        placeholder={name}
        defaultValue={defaultValueIndex !== undefined ? options[defaultValueIndex] : undefined}
        isClearable
        controlShouldRenderValue
        {...multiSelectProps}
      />
      <div ref={(node) => setRef(node)} />
    </div>
  );
};

export default MultiSelect;
