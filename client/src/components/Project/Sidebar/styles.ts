import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    borderRight: `1.5px solid rgba(51, 51, 102, 0.2)`,
    overflow: 'auto',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
    minWidth: '28rem',

    '@media (max-width: 1600px)': {
      minWidth: '22rem',
    },
  },
  routesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  route: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.4rem 3rem',
    cursor: 'pointer',

    '@media (max-width: 1600px)': {
      padding: '1.2rem 2rem',
    },
  },
  routeImg: {
    height: '2.5rem',
    width: '2.5rem',

    '@media (max-width: 1600px)': {
      height: '2rem',
      width: '2rem',
    },
  },
  routeText: {
    fontSize: '1.4rem',
    fontWeight: 400,
    color: theme.palette.primary.main,
    marginLeft: '3.4rem',

    '@media (max-width: 1600px)': {
      fontSize: '1.2rem',
    },
  },
}));
