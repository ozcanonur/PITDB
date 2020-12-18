import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 'max-content',
  },
  table: {
    minHeight: '49rem',
  },
  tableContainer: {
    padding: '2rem 4rem',
    paddingBottom: '0.5rem',
    position: 'relative',
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 2rem',

    '& > div:not(:last-child)': {
      marginRight: '5rem',
    },
  },
}));
