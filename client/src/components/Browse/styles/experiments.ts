import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '12rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',

    '& > div:not(:last-child)': {
      marginRight: '5rem',
    },
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchMultiSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  tableContainer: {
    marginTop: '4rem',
    padding: '0 1.5rem',
    minHeight: '50rem',
  },
}));
