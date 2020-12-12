import React, { useRef } from 'react';
import Select, { OptionsType, ValueType, components, ActionMeta } from 'react-select';
import usePortal from 'react-useportal';

import { selectStyles } from './styles/multiSelect';

const { ValueContainer, Placeholder, MultiValueContainer } = components;

interface Props {
  name: string;
  options: OptionsType<any>;
  onChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  selectProps?: any;
}

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const CustomMultiValueContainer = (renderOn: React.MutableRefObject<HTMLElement | null>) => {
  return ({ children, ...props }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Portal } = usePortal({
      bindTo: renderOn.current || undefined,
    });

    if (!renderOn.current) return null;

    return (
      <Portal>
        <MultiValueContainer {...props}>{React.Children.map(children, (child) => child)}</MultiValueContainer>
      </Portal>
    );
  };
};

const MultiSelect = ({ containerProps, selectProps, name, options, onChange }: Props) => {
  const ref = useRef(null);

  return (
    <div {...containerProps}>
      <Select
        name={name}
        components={{ ValueContainer: CustomValueContainer, MultiValueContainer: CustomMultiValueContainer(ref) }}
        closeMenuOnSelect={false}
        isMulti
        hideSelectedOptions={false}
        options={options}
        styles={selectStyles}
        onChange={onChange}
        placeholder={name}
        isClearable
        {...selectProps}
      />
      <div ref={ref} />
    </div>
  );
};

export default MultiSelect;
