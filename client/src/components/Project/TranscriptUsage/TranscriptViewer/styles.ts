import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    position: 'relative',
    direction: 'rtl',

    '@media (max-width: 1850px)': {
      marginTop: '2rem',
      marginRight: '1rem',
    },
  },
  transcriptViewerContainer: {
    maxHeight: '30rem',
    overflow: 'auto',
  },
  transcriptRails: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'auto',
    direction: 'rtl',
    height: 'max-content',
    padding: '1rem 2rem 0.5rem',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginRight: '3rem',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
    zIndex: -1,
  },
}));
