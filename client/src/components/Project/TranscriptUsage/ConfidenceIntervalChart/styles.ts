import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '38.65rem',
    position: 'relative',

    '@media (max-width: 1850px)': {
      marginLeft: 0,
      width: 'auto',
      minWidth: '31rem',
      flex: '1 1',
      marginRight: '1rem',
    },
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
  confidenceIntervalChartContainer: {
    padding: '2.5rem 1rem 5rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
