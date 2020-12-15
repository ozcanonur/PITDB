import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  home: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '1rem',
    position: 'relative',
  },
  heroContainer: {
    marginTop: '7rem',
    paddingLeft: '10rem',
  },
  heading: {
    color: 'white',
    fontSize: '4.5rem',
  },
  secondaryHeading: {
    color: 'white',
    fontWeight: 500,
    fontSize: '2rem',
    maxWidth: '76rem',
    lineHeight: 1.5,
    marginTop: '4rem',
    wordBreak: 'break-all',
  },
  browseButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    padding: '1.3rem 5.5rem',
    borderRadius: '0.8rem',
    fontSize: '1.8rem',
    fontWeight: 600,
    marginTop: '5rem',
    width: 'max-content',
    cursor: 'pointer',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'scale(1.05) translateY(-2px)',
      boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
    },
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
  },
  heroBg: {
    backgroundColor: theme.palette.primary.main,
    height: '53rem',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  helpContentContainer: {
    marginTop: '15rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: '18rem 0',
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',

    '& > div:not(:last-child)': {
      marginBottom: '10rem',
    },
  },
  questionCard: {
    backgroundColor: '#f6fafe',
    display: 'flex',
    flexDirection: 'column',
    padding: '4rem 4rem',
    maxWidth: '70rem',
    boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
    borderRadius: '1rem',
  },
  questionHeadingContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '3.8rem',
    color: theme.palette.primary.main,
  },
  questionIcon: {
    backgroundColor: theme.palette.secondary.main,
    color: '#baa02b',
    borderRadius: '50%',
    width: '4rem',
    height: '4rem',
    fontSize: '2rem',
    fontWeight: 600,
    position: 'relative',

    '& p': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  questionText: {
    marginLeft: '2rem',
    fontWeight: 600,
    fontSize: '2.3rem',
  },
  answerText: {
    marginTop: '2rem',
    fontSize: '1.75rem',
    color: '#5E709D',
    marginLeft: '6rem',
    lineHeight: 1.5,
  },
  topTriangleClip: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '30rem',
  },
  bottomTriangleClip: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '30rem',
    transform: 'rotate(180deg)',
  },
}));
