import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
    minWidth: '32rem',

    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '30rem',
    position: 'relative',
  },
  figureContainer: {
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
