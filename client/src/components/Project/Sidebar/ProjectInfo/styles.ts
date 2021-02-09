import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem 3rem',
    borderBottom: `1.5px solid rgba(51, 51, 102, 0.2)`,

    '@media (max-width: 1600px)': {
      padding: '1.5rem 1.6rem',
    },
  },
  infoImage: {
    height: '10.6rem',

    '@media (max-width: 1600px)': {
      height: '8.6rem',
    },
  },
  projectInfo: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    marginLeft: '2.3rem',

    '& > div:not(:last-child)': {
      marginBottom: '1.4rem',
    },

    '@media (max-width: 1600px)': {
      fontSize: '1.2rem',
    },
  },
  projectInfoTextIdentifier: {
    fontWeight: 500,
    marginRight: '0.5rem',
  },
}));
