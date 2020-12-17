import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '2.5rem 3rem',
    borderBottom: `1.3px solid rgba(51, 51, 102, 0.2)`,
  },
  infoImage: {
    height: '10.6rem',
  },
  projectInfo: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    marginLeft: '2.3rem',

    '& > div:not(:last-child)': {
      marginBottom: '1.4rem',
    },
  },
  projectInfoTextIdentifier: {
    fontWeight: 600,
    marginRight: '0.5rem',
  },
}));
