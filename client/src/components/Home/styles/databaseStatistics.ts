import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(to bottom, #ECF4FD 32%, white 68%)',
    marginTop: '25rem',
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
    marginTop: '2.7rem',
    fontWeight: 300,
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
    height: '3rem',
    width: '9rem',
    backgroundColor: theme.palette.primary.light,
  },
  statisticTextContainer: {
    marginLeft: '2.5rem',
  },
  statisticTitle: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  statisticDescription: {
    fontSize: '1.75rem',
    color: '#5E709D',
    fontWeight: 300,
    marginTop: '2rem',
  },
}));
