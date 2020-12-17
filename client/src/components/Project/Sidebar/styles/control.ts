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
    '&:not(:first-of-type)': {
      marginTop: '2.6rem',
    },
  },
  items: {
    marginLeft: '3rem',
    marginTop: '1.2rem',

    '& > div:not(:last-child)': {
      marginBottom: '.7rem',
    },
  },
  item: {
    fontSize: '1.4rem',
  },
  icon: {
    width: '1.4rem',
    height: '1.4rem',
  },
}));
