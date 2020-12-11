import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    maxWidth: '40rem',
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
    fontWeight: 500,
    marginTop: '5rem',
    width: 'max-content',
    cursor: 'pointer',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  heroBg: {
    backgroundColor: theme.palette.primary.main,
    height: '53rem',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  heroImg: {
    position: 'absolute',
    top: '7rem',
    right: '25rem',
    height: '57rem',
  },
}));
