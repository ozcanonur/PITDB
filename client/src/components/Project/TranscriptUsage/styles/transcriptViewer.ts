import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  transcriptViewerContainer: {
    width: '60%',
    padding: '2rem',
    display: 'flex',
    position: 'relative',
  },
  transcriptRails: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '100%',

    '& > svg:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
}));
