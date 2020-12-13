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
}));
