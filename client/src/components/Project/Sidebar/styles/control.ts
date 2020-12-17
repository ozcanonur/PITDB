import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  controlContainer: {
    padding: '2.5rem 3rem',
    display: 'flex',
    flexDirection: 'column',
  },
  controlItems: {
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontWeight: 500,
    '&:not(:first-of-type)': {
      marginTop: '0.5rem',
    },
  },
  items: {
    marginLeft: '3rem',
  },
  item: {
    fontSize: '1.4rem',
  },
  icon: {
    width: '1.4rem',
    height: '1.4rem',
  },
}));
