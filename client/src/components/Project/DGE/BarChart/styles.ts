import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '30rem',
    position: 'relative',
    maxHeight: '40rem',

    '@media (max-width: 1850px)': {
      marginLeft: 0,
      width: 'auto',
      minWidth: '31rem',
      flex: '1 1',
      marginRight: '1rem',
    },
  },
  barChartContainer: {
    transition: 'all .3s ease-in-out',
    height: '100%',
    width: '100%',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
}));
