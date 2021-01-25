import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    position: 'relative',
    width: '100%',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 2rem',
    paddingTop: '2rem',
  },
  filtersSubContainer: {
    display: 'flex',
    padding: '0 2rem',
    paddingLeft: '1.6rem',
    marginLeft: '6rem',

    '& > div:not(:last-child)': {
      marginRight: '6rem',
    },

    '& > div': {
      width: '16rem',
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
  transcriptRails: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '100%',
    overflow: 'auto',
    direction: 'rtl',
    height: 'max-content',
    padding: '1rem 2rem 0.5rem',

    '&::-webkit-scrollbar': {
      width: '10px',
    },

    '&::-webkit-scrollbar-track': {
      background: '#eee',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(51, 51, 102, 0.8)',
      border: '1px solid white',
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
  noResults: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  detailedTranscriptViewerContainer: {
    padding: '2rem',
    display: 'flex',
  },
  detailedTranscripts: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '100%',
    overflow: 'auto',
    direction: 'ltr',
    height: 'max-content',
    marginTop: '0.8rem',

    '& div:nth-child(2) > div': {
      backgroundColor: '#336 !important',
    },
  },
  detailedTranscriptContainer: {
    direction: 'ltr',
    width: 0,
    marginBottom: '2rem',
    position: 'relative',
  },
  transcriptsInfoContainer: {
    paddingRight: '2rem',
    paddingLeft: '1rem',
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
    position: 'absolute',
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
}));
