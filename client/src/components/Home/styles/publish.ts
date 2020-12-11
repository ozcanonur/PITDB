import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(to bottom, #ECF4FD 32%, white 68%)',
    marginTop: '10rem',
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
  },
  cardClip: {
    position: 'absolute',
    right: '-2.5rem',
    top: '-3rem',
    height: '8rem',
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '5rem 10rem',
  },
  heading: {
    fontSize: '3.8rem',
    color: theme.palette.primary.main,
  },
  subHeading: {
    fontSize: '1.8rem',
    color: '#5E709D',
    marginTop: '2.7rem',
    fontWeight: 300,
  },
  bulletPointsContainer: {
    padding: '0 7rem',
  },
  bulletPointsTextContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '2rem',
    wordBreak: 'break-all',

    '& > div:nth-child(1)': {
      transform: 'translateX(-1.3rem)',
    },
    '& > div:nth-child(2)': {
      transform: 'translateX(-4.5rem)',
    },
    '& > div:nth-child(3)': {
      transform: 'translateX(-4.6rem)',
    },
    '& > div:nth-child(4)': {
      transform: 'translateX(-2.5rem)',
    },
  },
  bulletPoint: {
    maxWidth: '20rem',
  },
  bulletPointTitle: {
    fontSize: '1.8rem',
    color: theme.palette.primary.main,
  },
  bulletPointText: {
    marginTop: '1.2rem',
    fontWeight: 300,
    fontSize: '1.5rem',
    color: '#5E709D',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',

    '& div': {
      borderRadius: '0.8rem',
      fontSize: '1.6rem',
      fontWeight: 500,
      marginTop: '5rem',
      width: 'max-content',
      cursor: 'pointer',
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  },
  downloadButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    padding: '1.3rem 2.4rem',
  },
  browseButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: '6rem',
    padding: '1.3rem 5.5rem',
  },
}));
