import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(to bottom, white 25% , #F2F4FF )',
  },
  about: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
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
    fontWeight: 400,
  },
}));
