import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '2rem 0',
    // transform: 'translateX(-12rem)',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
}));
