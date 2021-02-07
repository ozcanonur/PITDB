import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    position: 'relative',
    width: '100%',
    minHeight: '48rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 2rem',
    paddingTop: '2rem',
    paddingBottom: '3.5rem',

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

    '& > div > div > div > div': {
      marginBottom: '1rem',
    },
  },
  transcriptOverview: {
    display: 'flex',
    zIndex: 999,
    position: 'relative',

    '& > svg': {
      paddingBottom: '2rem',
    },
  },
  transcriptId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    marginTop: '0.25vw',
    flexGrow: 1,
    textAlign: 'end',
  },
  transcriptIdContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '2rem',
    alignItems: 'flex-start',
    minWidth: '23rem',
  },
  transcriptIdCondition: {
    borderRadius: '0.3rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
    padding: 0,
    alignItems: 'center',
    display: 'flex',
    marginRight: 0,

    '& > p': {
      padding: '0 1rem',
      cursor: 'pointer',
    },
  },
  transcriptPositionLineContainer: {
    position: 'absolute',
    left: '27rem',
    bottom: 0,
    width: 'calc(100% - 29rem)',
    marginBottom: '0 !important',
    transition: 'all .2s',
  },
  transcriptPositionLine: {
    backgroundColor: 'rgba(217, 33, 122, 0.7)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '2px',
    height: 'calc(100% + 2rem)',
  },
  transcriptPositionText: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '-2rem',
    marginLeft: '1rem',
    width: 'max-content',
  },
  hideTranscriptButton: {
    height: '100%',
    backgroundColor: '#808080',
    padding: '1rem 0.4rem',
    borderRadius: '0.3rem 0 0 0.3rem',
    transition: 'all .2s',

    '&:hover': {
      backgroundColor: '#ff4949',
    },
  },
  showTranscriptButton: {
    height: '100%',
    backgroundColor: '#808080',
    padding: '1rem 0.4rem',
    borderRadius: '0.3rem 0 0 0.3rem',
    transition: 'all .2s',

    '&:hover': {
      backgroundColor: '#64A74D',
    },
  },
  hideTranscriptButtonIcon: {
    color: 'white',
  },
  collapseHidddenTranscriptsButton: {
    padding: '0.8rem 0',
    borderRadius: '0.3rem',
    backgroundColor: 'grey',
    marginRight: '1rem',
    flexGrow: 1,
    transition: 'all .2s',
    width: '24rem',
    marginBottom: '3rem',
    marginLeft: '2rem',

    '&:hover': {
      backgroundColor: '#35363A',
    },

    '& > span': {
      padding: '0 1.8rem',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.4rem',

      '& > span': {
        marginRight: '1rem',
      },
    },
  },
}));
