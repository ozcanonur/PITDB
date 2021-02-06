import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    position: 'relative',
    width: '100%',
    paddingBottom: '1rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2rem',
    paddingBottom: 0,

    '& > div:not(:last-child)': {
      marginRight: '6rem',
    },
  },
  multiSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  singleSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2rem',
  },
  transcriptViewerContainer: {
    overflow: 'auto',
    marginTop: '1rem',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
  noResults: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  transcriptsOverviewContainer: {
    width: '100%',
    position: 'relative',
    padding: '0 2rem',
  },
  transcriptOverview: {
    display: 'flex',
    alignItems: 'center',
  },
  transcriptId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
  transcriptIdContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '2rem',
    alignItems: 'center',
  },
  transcriptIdCondition: {
    marginRight: '5.5rem',
    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    width: '4rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
    height: 30,
  },
  transcriptPositionLine: {
    backgroundColor: 'rgba(217, 33, 122, 0.7)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '2px',
  },
  transcriptPositionText: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '-2rem',
    marginLeft: '1rem',
  },
  hideShowTranscriptsButtonsContainer: {
    padding: '0 2rem',
    marginBottom: '1rem',
    paddingLeft: '2rem',
    paddingRight: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '27rem',
  },
  hideAllTranscriptsButton: {
    padding: '0.8rem 0',
    borderRadius: '0.3rem',
    backgroundColor: '#ff4949',
    marginRight: '1rem',
    flexGrow: 1,
    transition: 'all .2s',

    '&:hover': {
      backgroundColor: 'red',
    },

    '& > span': {
      padding: '0 1rem',
      justifyContent: 'space-around',
      color: 'white',
      fontSize: '1.4rem',
    },
  },
  showAllTranscriptsButton: {
    padding: '0.8rem 0',
    borderRadius: '0.3rem',
    backgroundColor: '#64A74D',
    flexGrow: 1,
    transition: 'all .2s',

    '&:hover': {
      backgroundColor: 'green',
    },

    '& > span': {
      padding: '0 1rem',
      justifyContent: 'space-around',
      color: 'white',
      fontSize: '1.4rem',
    },
  },

  hideTranscriptButtonIcon: {
    color: 'white',
  },
}));
