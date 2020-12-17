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
}));
