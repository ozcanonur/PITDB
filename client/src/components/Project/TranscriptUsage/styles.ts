import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
    flexGrow: 1,
    padding: '2rem',
    paddingBottom: '4rem',
    flexDirection: 'column',
  },
  figuresContainer: {
    marginTop: '2rem',
    marginRight: '1rem',
  },
  figures: {
    display: 'flex',
    height: '33rem',
  },
}));
