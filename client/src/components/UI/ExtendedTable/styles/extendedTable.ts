import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '12rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '-2rem',

    '& > div:not(:last-child)': {
      marginRight: '5rem',
    },
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  searchMultiSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginTop: '2rem',
  },
  rangeSlider: {
    marginTop: '2rem',
  },
  tableContainer: {
    marginTop: '4rem',
    padding: '0 1.5rem',
    minHeight: '50rem',
  },
}));
