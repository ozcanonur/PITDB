import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4.1rem 2rem',
  },
  heading: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
  subHeading: {
    fontSize: '1.6rem',
    color: theme.palette.primary.light,
    marginTop: '1rem',
  },
}));
