import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: 'max-content',
    marginRight: '1rem',
    // flexGrow: 1,
  },
  tableContainer: {
    padding: '2rem 4rem',
    paddingBottom: '0.5rem',
    position: 'relative',
    minHeight: '52rem',
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 2rem',
    paddingTop: '2rem',
    justifyContent: 'space-between',
  },
  singleSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2rem',
  },
  multiSelectContainer: {
    display: 'flex',
    padding: '0 2rem',

    '& > div:not(:last-child)': {
      marginRight: '4rem',
    },
  },
}));
