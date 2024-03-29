import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  home: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '1rem',
    position: 'relative',
  },
  heroBg: {
    backgroundColor: theme.palette.primary.main,
    height: '53rem',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  heroImg: {
    position: 'absolute',
    top: '4rem',
    right: '-4rem',
    height: '57rem',
    zIndex: 999,

    '@media (max-width: 1350px)': {
      height: '45rem',
      right: '8rem',
      top: '7rem',
    },
  },
}));
