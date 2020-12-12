import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div:not(:last-child)': {
      marginRight: '8rem',
    },
  },
  cardContainer: {
    borderRadius: '1rem',
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
    cursor: 'pointer',
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(1.05)  translateY(-2px)',
      boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
    },
  },
  cardTop: {
    padding: '2rem 4.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopRightRadius: '1rem',
    borderTopLeftRadius: '1rem',
  },
  cardImg: {
    height: '3.8rem',
    marginTop: '2rem',
  },
  cardTopText: {
    color: 'white',
    marginTop: '2rem',
    fontSize: '1.4rem',
  },
  cardBottom: {
    padding: '1.5rem 1.8rem',
  },
  cardBottomTextsContainer: {
    fontWeight: 300,
    fontSize: '1.4rem',

    '& > div:first-child': {
      marginBottom: '0.8rem',
    },
  },
  cardBottomFooter: {
    display: 'flex',
    marginTop: '3rem',
    alignItems: 'center',
  },
  cardBottomFooterImg: {
    height: '2.4rem',
  },
  cardBottomFooterTextsContainer: {
    color: theme.palette.primary.main,
    marginLeft: '1rem',
    fontWeight: 300,
    fontSize: '1.2rem',
  },
  cardBottomTextsUsername: {},
  cardBottomTextsDate: {
    marginTop: '0.2rem',
  },
}));
