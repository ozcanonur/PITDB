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
    padding: '1rem 2rem',
    paddingTop: '2rem',

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
  },
  transcriptPositionLine: {
    backgroundColor: 'rgba(217, 33, 122, 0.5)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '100%',
    width: '3px',
  },
}));

// transcriptRails: {
//   display: 'flex',
//   flexDirection: 'column',
//   transform: 'translateZ(0)',
//   width: '100%',
//   overflow: 'auto',
//   direction: 'rtl',
//   height: 'max-content',
//   padding: '1rem 2rem 0.5rem',
// },
// transcriptsInfoContainer: {
//   paddingRight: '2rem',
//   paddingTop: '0.8rem',

//   '& > div:not(:last-of-type)': {
//     marginBottom: '2.1rem',
//   },

//   '& > div:last-of-type': {
//     marginBottom: '2.3rem',
//   },

//   '& > p:last-of-type': {
//     marginTop: '1.6rem',
//   },
// },
// transcriptInfo: {
//   display: 'flex',
//   flexDirection: 'column',
// },
// transcriptId: {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// },
// transcriptIdConditions: {
//   display: 'flex',
//   marginRight: '1rem',

//   '& > div:not(:last-child)': {
//     marginRight: '0.5rem',
//   },
// },
// transcriptIdCondition: {
//   fontSize: '1.4rem',
//   color: 'white',
//   textAlign: 'center',

//   boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
// },
// transcriptIdText: {
//   fontSize: '1.4rem',
//   color: theme.palette.primary.main,
//   textAlign: 'right',
// },
// transcriptNamesContainer: {
//   display: 'flex',
//   flexDirection: 'column',
//   marginRight: '2rem',
//   marginTop: '1.7rem',

//   '& > div:not(:last-child)': {
//     marginBottom: '3.6rem',
//   },
// },
// transcriptOverviewContainer: {
//   padding: '0 2rem',
//   display: 'flex',
// },
