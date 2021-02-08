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
    minHeight: '57rem',

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
  multiSelectContainer: {
    display: 'flex',
    paddingRight: '2rem',

    '& > div:not(:last-child)': {
      marginRight: '4rem',
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
