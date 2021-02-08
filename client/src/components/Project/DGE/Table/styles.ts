import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: 'max-content',
    marginRight: '1rem',
    flexGrow: 1,

    '@media (max-width: 1850px)': {
      flexGrow: 0,
    },
  },
  tableContainer: {
    padding: '2rem 4rem',
    paddingBottom: '0.5rem',
    position: 'relative',
    minHeight: '53.3rem',

    '@media (max-width: 1850px)': {
      minHeight: 'auto',
    },
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 2rem',
    paddingTop: '2rem',

    '& > div:not(:last-child)': {
      marginRight: '4rem',
    },
  },
  singleSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2rem',
  },
  filtersSubContainer: {
    display: 'flex',
    padding: '0 2rem',
    paddingLeft: '1.6rem',

    '& > div:not(:last-child)': {
      marginRight: '6rem',
    },

    '& > div': {
      width: '16rem',
    },
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  goToGeneBrowserIcon: {
    width: '2rem',
    height: '2rem',
    verticalAlign: 'middle',
    transition: 'all .15s',
  },
}));
