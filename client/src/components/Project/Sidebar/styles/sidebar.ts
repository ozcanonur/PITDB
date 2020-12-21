import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    minHeight: '100vh',
    maxHeight: '100vh',
    borderRight: `1.5px solid rgba(51, 51, 102, 0.2)`,
    minWidth: '28rem',
    overflow: 'auto',
    transform: 'translateZ(0)',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
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
    height: '2.5rem',
    width: '2.5rem',
  },
  routeText: {
    fontSize: '1.4rem',
    fontWeight: 400,
    color: theme.palette.primary.main,
    marginLeft: '3.4rem',
  },
}));
