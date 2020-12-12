import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: '2rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoImg: {
    height: '2rem',
  },
  logoText: {
    color: 'white',
    fontSize: '3rem',
    fontWeight: 700,
    marginLeft: '1rem',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    width: '50rem',
    justifyContent: 'space-between',
    '& li': {
      listStyle: 'none',
      cursor: 'pointer',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid transparent',
      transition: 'border-bottom .2s',

      '&:hover': {
        borderBottom: '1px solid white !important',
      },
      '&:last-child:hover': {
        borderBottom: '0 !important',
      },
    },
  },
  navItem: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 400,
  },
  getPitButton: {
    color: theme.palette.primary.main,
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
    backgroundColor: 'white',
    padding: '1.3rem 4rem',
    borderRadius: '0.8rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'scale(1.05)  translateY(-2px)',
      boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
    },
  },
}));
