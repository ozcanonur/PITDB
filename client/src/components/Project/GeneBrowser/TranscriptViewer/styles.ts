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
  detailedTranscriptContainer: {
    direction: 'ltr',
    overflow: 'auto',
    width: 0,
    marginBottom: '2rem',
    minWidth: '100%',

    '&::-webkit-scrollbar': {
      width: '10px',
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: '50px',
      border: '5px solid white',
    },
  },
}));

/* *::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: '#f4f6ff';
}

*::-webkit-scrollbar-thumb {
  background-color: #858592;
  border-radius: 2px;
  border: 3px solid white;
} */
