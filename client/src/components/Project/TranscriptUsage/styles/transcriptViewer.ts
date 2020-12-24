import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  transcriptViewerContainer: {
    width: '60%',
    padding: '2rem',
    display: 'flex',
    position: 'relative',
    overflow: 'auto',
    direction: 'rtl',
  },
  transcriptRails: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '100%',
    marginTop: '1rem',
    overflow: 'auto',
    direction: 'rtl',
    height: 'max-content',

    '& > svg:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  loading: {
    position: 'absolute',
    left: '43%',
    top: '50%',
    marginRight: '3rem',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
}));
