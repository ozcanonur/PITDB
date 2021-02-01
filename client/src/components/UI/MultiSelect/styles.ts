import { Styles } from 'react-select';

export const selectStyles: Styles = {
  placeholder: (styles) => ({
    ...styles,
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#333366',
  }),
  control: (styles, { selectProps, isFocused }) => ({
    ...styles,
    borderRadius: '0.8rem',
    justifyContent: 'flex-end',
    boxShadow: '0 5px 10px rgba(154,160,185,.18), 0 15px 40px rgba(166,173,201,.25)',
    border: 'none',
    minHeight: '4rem',
    width: '19rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    backgroundColor: !selectProps.value ? 'rgba(255, 0, 0, 0.1)' : 'transparent',

    '& div[class$="placeholder"]': {
      transition: 'all .15s',
      transform: isFocused ? 'translateY(-1.4rem)' : 'translateY(-50%)',
      fontSize: isFocused ? '0.8rem' : '1.4rem',
    },
  }),
  multiValue: (styles) => ({
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
    width: '18rem',
    overflow: 'hidden',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
    fontSize: '1.4rem',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    fontSize: '2rem',
    borderRadius: '0.3rem',
    '&:hover': {
      backgroundColor: 'white',
      color: '#333366',
    },
    pointerEvents: 'all',
  }),
  menuList: (styles) => ({
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
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '0.8rem',
    justifyContent: 'flex-end',
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
    border: 'none',
    marginTop: 0,
    zIndex: 9999,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  dropdownIndicator: (styles, { isFocused }) => ({
    ...styles,
    color: isFocused ? '#333366' : '#99CB99',
  }),
  input: (styles) => ({
    ...styles,
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#333366',
    width: '100%',
  }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    backgroundColor: isSelected ? '#333366 !important' : isFocused ? 'rgba(107, 107, 179, 0.15)' : 'none',
    cursor: 'pointer',

    '&:active': {
      backgroundColor: 'rgba(51, 51, 102, 0.4)',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: '1.5rem',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
  }),
};
