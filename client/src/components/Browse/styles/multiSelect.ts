import { Styles } from 'react-select';

export const selectStyles: Styles = {
  placeholder: (styles) => {
    return {
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
      color: '#333366',
    };
  },
  control: (styles) => {
    return {
      ...styles,
      borderRadius: '0.8rem',
      justifyContent: 'flex-end',
      boxShadow: '0 5px 10px rgba(154,160,185,.18), 0 15px 40px rgba(166,173,201,.25)',
      border: 'none',
      minHeight: '4rem',
      width: '17rem',
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      display: 'none',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 400,
      color: '#333366',
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      borderRadius: '0.8rem',
      justifyContent: 'flex-end',
      boxShadow: '0 5px 10px rgba(154,160,185,.18), 0 15px 40px rgba(166,173,201,.25)',
      border: 'none',
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      display: 'none',
    };
  },
  clearIndicator: (styles) => {
    return {
      ...styles,
      display: 'none',
    };
  },
  dropdownIndicator: (styles, { isFocused }) => {
    return {
      ...styles,
      color: isFocused ? '#333366' : '#99CB99',
    };
  },
  input: (styles) => {
    return {
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
      color: '#333366',
      width: '100%',
    };
  },
  option: (styles, { isSelected, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#333366' : isFocused ? 'rgba(51, 51, 102, 0.1)' : 'none',
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      paddingLeft: '1.5rem',
    };
  },
};
