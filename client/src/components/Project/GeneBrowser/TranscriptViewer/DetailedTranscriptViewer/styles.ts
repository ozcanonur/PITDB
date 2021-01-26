import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  detailedTranscriptViewerContainer: {
    padding: '2rem',
    paddingTop: '3rem',
    display: 'flex',
    overflow: 'auto',
  },
  detailedTranscripts: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'auto',
    direction: 'ltr',
    height: 'max-content',
    marginTop: '0.8rem',
    position: 'relative',
  },
  detailedTranscriptContainer: {
    direction: 'ltr',
    width: 0,
    marginBottom: '2rem',
    position: 'relative',
  },
  transcriptsInfoContainer: {
    paddingRight: '2rem',
    paddingTop: '0.8rem',

    '& > div:not(:last-of-type)': {
      marginBottom: '2.1rem',
    },

    '& > div:last-of-type': {
      marginBottom: '2.3rem',
    },

    '& > p:last-of-type': {
      marginTop: '1.6rem',
    },
  },
  transcriptInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  transcriptId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transcriptIdConditions: {
    display: 'flex',
    marginRight: '1rem',

    '& > div:not(:last-child)': {
      marginRight: '0.5rem',
    },
  },
  transcriptIdCondition: {
    fontSize: '1.4rem',
    color: 'white',
    textAlign: 'center',

    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    width: '4rem',

    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
  },
  transcriptIdText: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    textAlign: 'right',
  },
  cdssContainer: {
    marginTop: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

    '& > p:not(:last-child)': {
      marginBottom: '1.2rem',
    },
  },
  scrollLabelText: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    textAlign: 'right',
  },
  scrollTooltipContainer: {
    position: 'fixed',
    bottom: '2.3rem',
    backgroundColor: 'white',
    boxShadow: '0 5px 10px rgba(154,160,185,.15), 0 15px 40px rgba(166,173,201,.2)',
    borderRadius: '4px',
    padding: '1rem',
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
  tooltipPositionText: {
    fontSize: '1.2rem',
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: '0.5rem',
  },
}));
