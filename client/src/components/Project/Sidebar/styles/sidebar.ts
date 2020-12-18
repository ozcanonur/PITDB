import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    minHeight: '100vh',
    maxHeight: '100vh',
    borderRight: `1.3px solid rgba(51, 51, 102, 0.3)`,
    maxWidth: '35rem',
    overflow: 'auto',
    transform: 'translateZ(0)',
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
  },
  routeImg: {
    height: '3.2rem',
    width: '3.2rem',
  },
  routeText: {
    fontSize: '1.4rem',
    fontWeight: 400,
    color: theme.palette.primary.main,
    marginLeft: '3.4rem',
  },
}));
