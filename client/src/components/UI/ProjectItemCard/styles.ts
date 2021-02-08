import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '1rem',
    background: 'linear-gradient(to bottom, rgba(51,51,102) 4rem, white 4rem, white)',
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.15)',
  },
  header: {
    // backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '1.4rem',
    height: '3.6rem',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',
  },
}));
