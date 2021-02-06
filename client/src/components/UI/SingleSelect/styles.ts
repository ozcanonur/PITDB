import { Styles } from 'react-select';
import { selectStyles } from 'components/UI/MultiSelect/styles';

export const singleSelectStyles: Styles = {
  ...selectStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    borderRadius: '0.8rem',
    justifyContent: 'flex-end',
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
    border: 'none',
    minHeight: '4rem',
    width: '22rem',
    marginBottom: '1rem',
    cursor: 'pointer',

    '& div[class$="placeholder"]': {
      transition: 'all .15s',
      transform: isFocused ? 'translateY(-1.4rem)' : 'translateY(-50%)',
      fontSize: isFocused ? '0.8rem' : '1.4rem',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: '1.4rem',
    fontWeight: 500,
  }),
};
