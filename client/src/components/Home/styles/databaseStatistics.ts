import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(-190deg,#ebf4fd,hsla(0,0%,100%,0) 75%)',
    marginTop: '24rem',
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
  },
  cardClip: {
    position: 'absolute',
    left: '-2.5rem',
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
    marginTop: '3rem',
    fontWeight: 400,
  },
  statisticsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    marginTop: '3rem',
    gridGap: '6rem',
    gridColumnGap: '8rem',
    padding: '0 4rem',
    paddingLeft: '8rem',
  },
  statistic: {
    fontSize: '3rem',
    display: 'flex',
  },
  square: {
    height: '2.6rem',
    width: '7.2rem',
    backgroundColor: theme.palette.primary.light,
    boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
  },
  statisticTextContainer: {
    marginLeft: '2rem',
  },
  statisticTitle: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  statisticDescription: {
    fontSize: '1.75rem',
    color: '#5E709D',
    fontWeight: 400,
    marginTop: '2rem',
  },
}));
