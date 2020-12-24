import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sliderLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.4rem',
    letterSpacing: 0,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  root: {
    width: '17rem',
  },
  rail: {
    color: '#CCCCCC',
    opacity: 1,
  },
  valueLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 500,
    letterSpacing: 0,
    color: theme.palette.primary.main,
    top: '2rem',
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  active: {
    boxShadow: '0 0 0 8px rgba(51, 51, 102, 0.15) !important',
  },
}));
