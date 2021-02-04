import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tooltipPositionText: {
    fontSize: '1.2rem',
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  scrollContainer: {
    position: 'absolute',
    left: '27rem',
    overflow: 'auto',
    width: 'calc(100% - 29rem)',
  },
  scroll: {
    height: 1,
  },
  tooltipTranscripts: {
    '& > svg:not(:last-child)': {
      marginBottom: '0.5rem',
    },
  },
  scrollTooltipContainer: {
    willChange: 'transform',
    backgroundColor: 'white',
    boxShadow: '5px 5px 10px 10px rgba(154,160,185,.15), 15px 15px 40px 10px rgba(166,173,201,.2)',
    borderRadius: '4px',
    padding: '1rem',
    zIndex: 9999,
    left: '27rem',
    width: 'max-content',
    opacity: 0.9,
  },
  transcriptTooltipRails: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '40rem',
    overflow: 'auto',
    direction: 'rtl',
    height: 'max-content',
  },
  transcriptPositionLine: {
    backgroundColor: 'rgba(217, 33, 122, 0.5)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '100%',
    width: '2px',
  },
}));
