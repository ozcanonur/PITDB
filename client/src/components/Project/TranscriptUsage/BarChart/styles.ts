import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    transform: 'translateX(-15rem)',
  },
  figureContainer: {
    transition: 'all .3s ease-in-out',
    height: '100%',
    width: '40rem',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
}));
