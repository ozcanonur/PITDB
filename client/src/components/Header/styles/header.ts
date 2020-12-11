import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
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
  navContainer: {},
  nav: {
    display: 'flex',
    alignItems: 'center',
    width: '65rem',
    justifyContent: 'space-between',
    '& li': {
      listStyle: 'none',
      cursor: 'pointer',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid transparent',
      transition: 'all .2s',
      '&:hover': {
        borderBottom: '1px solid white',
      },
      '&:last-child:hover': {
        borderBottom: 0,
      },
    },
  },
  navItem: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  getPitButton: {
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    padding: '1.3rem 4rem',
    borderRadius: '0.8rem',
    fontSize: '1.5rem',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));
