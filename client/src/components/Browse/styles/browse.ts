import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {},
  browse: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '1rem',
  },
  heroBg: {
    backgroundColor: theme.palette.primary.main,
    height: '9rem',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10rem',
  },
  heading: {
    fontSize: '3.8rem',
    color: theme.palette.primary.main,
  },
  subHeading: {
    fontSize: '1.8rem',
    color: '#5E709D',
    marginTop: '3.2rem',
    fontWeight: 300,
  },
}));
