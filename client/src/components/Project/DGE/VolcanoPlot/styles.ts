import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '30rem',
    position: 'relative',
    maxHeight: '40rem',
    minHeight: '35rem',
    overflow: 'hidden',

    '@media (max-width: 1850px)': {
      marginLeft: 0,
      width: 'auto',
      minWidth: '31rem',
      flex: '1 1',
    },
  },
  figureContainer: {
    transition: 'all .3s ease-in-out',
    height: '100%',
    width: '100%',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
  volcanoTooltipContainer: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
    position: 'absolute',
    width: 'max-content',

    '& > div:not(:last-child)': {
      marginRight: '.5rem',
    },
  },
  volcanoTooltipSquare: {
    height: '1.4rem',
    width: '1.4rem',
    backgroundColor: 'red',
    marginRight: '.8rem !important',
  },
  volcanoTooltipName: {
    fontWeight: 500,
  },
  volcanoTooltipValues: {
    fontWeight: 600,
  },
}));
