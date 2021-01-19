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

    // WOOP, hardcode for testing detailed transcript svg
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
    padding: '0 2rem',
    marginTop: '2rem',
    display: 'flex',
  },
  detailedTranscripts: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',
    width: '100%',
    overflow: 'auto',
    direction: 'rtl',
    height: 'max-content',

    // WOOP, hardcode for testing detailed transcript svg
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
  detailedTranscriptContainer: {
    direction: 'ltr',
    // overflow: 'auto',
    width: 0,
    marginBottom: '2rem',
    // minWidth: '100%',
    position: 'relative',
    // display: 'flex',
  },
  transcriptIdContainer: {
    marginRight: '2rem',

    '& > p:first-of-type': {
      marginTop: '0.8rem',
    },

    '& > p:not(:last-child)': {
      marginBottom: '6.3rem',
    },
  },
  transcriptId: {
    fontSize: '1.6rem',
    color: theme.palette.primary.main,
  },
}));
