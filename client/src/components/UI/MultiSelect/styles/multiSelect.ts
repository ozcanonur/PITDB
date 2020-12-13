import { Styles } from 'react-select';

export const selectStyles: Styles = {
  placeholder: (styles) => {
    return {
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#333366',
    };
  },
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      borderRadius: '0.8rem',
      justifyContent: 'flex-end',
      boxShadow: '0 5px 10px rgba(154,160,185,.18), 0 15px 40px rgba(166,173,201,.25)',
      border: 'none',
      minHeight: '4rem',
      width: '17rem',
      marginBottom: '1rem',
      cursor: 'pointer',

      '& div[class$="placeholder"]': {
        transition: 'all .15s',
        transform: isFocused ? 'translateY(-1.4rem)' : 'translateY(-50%)',
        fontSize: isFocused ? '0.8rem' : '1.4rem',
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#333366',
      marginTop: '0.5rem',
      borderRadius: '0.7rem',
      padding: '0.5rem 1.2rem',
      paddingRight: '0.6rem',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.4rem',
      pointerEvents: 'none',
      margin: 0,
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      color: 'white',
      fontSize: '1.4rem',
    };
  },
  multiValueRemove: (styles) => {
    return {
      ...styles,
      color: 'white',
      fontSize: '2rem',
      '&:hover': {
        backgroundColor: 'white',
        color: '#333366',
      },
      pointerEvents: 'all',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.4rem',
      fontWeight: 400,
      color: '#333366',
      padding: 0,

      '& > div:first-of-type': {
        borderTopLeftRadius: '0.8rem',
        borderTopRightRadius: '0.8rem',
      },

      '& > div:last-child': {
        borderBottomLeftRadius: '0.8rem',
        borderBottomRightRadius: '0.8rem',
      },
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
      fontWeight: 600,
      color: '#333366',
      width: '100%',

      '& input:active': {
        backgroundColor: 'red',
      },
      '&:focus': {
        backgroundColor: 'red',
      },
    };
  },
  option: (styles, { isSelected, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#333366' : isFocused ? 'rgba(51, 51, 102, 0.1)' : 'none',
      cursor: 'pointer',

      '&:active': {
        backgroundColor: 'rgba(51, 51, 102, 0.4)',
      },
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      paddingLeft: '1.5rem',
    };
  },
};

export const searchStyles: Styles = {
  ...selectStyles,
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      borderRadius: '0.8rem',
      justifyContent: 'flex-end',
      boxShadow: '0 5px 10px rgba(154,160,185,.18), 0 15px 40px rgba(166,173,201,.25)',
      border: 'none',
      minHeight: '4rem',
      width: '25rem',
      marginBottom: '1rem',
      cursor: 'pointer',

      '& div[class$="placeholder"]': {
        transition: 'all .15s',
        transform: isFocused ? 'translateY(-1.4rem)' : 'translateY(-50%)',
        fontSize: isFocused ? '0.8rem' : '1.4rem',
      },
    };
  },
  singleValue: (styles) => {
    return {
      ...styles,
      fontSize: '1.4rem',
      fontWeight: 500,
    };
  },
};
