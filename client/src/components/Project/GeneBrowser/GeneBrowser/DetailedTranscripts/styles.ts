import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  detailedTranscriptViewerContainer: {
    padding: '2rem',
    display: 'flex',
    overflow: 'auto',
    position: 'relative',
    marginTop: '0.5rem',
    transform: 'translateZ(0)',
  },
  detailedTranscripts: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'max-content',
    position: 'relative',

    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  transcriptsInfoContainer: {
    marginRight: '2rem',
    paddingTop: '0.8rem',
    width: '24rem',

    '& > div:not(:last-of-type)': {
      marginBottom: '4.6rem',
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
  scrollDragContainer: {
    position: 'absolute',
    left: '28rem',
    width: 'calc(100% - 30rem)',
    top: '2rem',
    zIndex: 9999,
    height: 'calc(100% - 36px)',
    cursor: 'grab',
  },
  scroll: {
    height: 1,
  },
  transcriptPositionLineText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
  },
}));
