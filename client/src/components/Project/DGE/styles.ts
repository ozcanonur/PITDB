import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
    flexGrow: 1,
    padding: '2rem',
  },
  subContainer: {
    display: 'flex',
    marginBottom: '2rem',
    flexGrow: 1,

    '@media (max-width: 1850px)': {
      flexDirection: 'column',
    },
  },
  figuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '35%',
    minWidth: '32rem',
    marginRight: '1rem',

    '& > *:not(:last-child)': {
      marginBottom: '2rem',

      '@media (max-width: 1850px)': {
        marginBottom: 0,
        marginRight: '2rem',
      },
    },

    '@media (max-width: 1850px)': {
      flexDirection: 'row',
      width: '100%',
      marginTop: '2rem',

      '& > *': {
        minHeight: '35rem',
      },
    },
  },
  placeholderDiv: {
    minWidth: '35%',

    '@media (max-width: 1850px)': {
      minWidth: '50%',
    },
  },
}));
