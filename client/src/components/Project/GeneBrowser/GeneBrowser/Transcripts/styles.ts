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
    marginTop: '1rem',

    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },

    // '& > div:nth-last-child(2)': {
    //   marginBottom: 0,
    // },

    // '& > div:nth-last-child(3)': {
    //   marginBottom: 0,
    // },
  },
  transcriptOverview: {
    display: 'flex',
    zIndex: 999,
    position: 'relative',
  },
  transcriptId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    marginTop: '0.25vw',
  },
  transcriptIdContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '2rem',
    alignItems: 'flex-start',
    minWidth: '24rem',
  },
  transcriptIdCondition: {
    marginRight: '5.5rem',
    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    width: '4rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
  },
  transcriptPositionLineContainer: {
    position: 'absolute',
    height: '100%',
    left: '28rem',
    top: 0,
    width: 'calc(100% - 30rem)',
    marginBottom: '0 !important',
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
  },
}));
