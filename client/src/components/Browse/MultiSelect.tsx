import React from 'react';
import Select, { OptionsType, ValueType, components, ActionMeta } from 'react-select';

import { selectStyles } from './styles/multiSelect';

const { ValueContainer, Placeholder } = components;

interface Props {
  name: string;
  options: OptionsType<any>;
  onChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
}

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const MultiSelect = ({ name, options, onChange }: Props) => {
  return (
    <Select
      name={name}
      components={{ ValueContainer: CustomValueContainer }}
      closeMenuOnSelect={false}
      isMulti
      hideSelectedOptions={false}
      options={options}
      styles={selectStyles}
      onChange={onChange}
      placeholder={name}
      isClearable
    />
  );
};

export default MultiSelect;
