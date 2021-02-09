import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '30rem',
    position: 'relative',

    '@media (max-width: 1850px)': {
      marginRight: '1rem',
      width: 'auto',
      minWidth: '31rem',
      flex: '1 1 50%',
    },
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
  svg: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',

    '@media screen and (max-width: 1920px)': {
      width: '90%',
    },

    '@media screen and (max-width: 1800px)': {
      width: '100%',
    },
  },
}));
