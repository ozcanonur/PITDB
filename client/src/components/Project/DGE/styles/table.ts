import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: 'max-content',
    marginRight: '1rem',
  },
  tableContainer: {
    padding: '2rem 4rem',
    paddingBottom: '0.5rem',
    position: 'relative',
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
  slidersContainer: {
    display: 'flex',
    padding: '0 2rem',

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
}));
