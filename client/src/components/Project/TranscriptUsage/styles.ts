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
  tableAndFigures: {
    display: 'flex',
    width: '100%',
    height: 'max-content',
    marginTop: '2rem',
  },
  figuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '35%',
    minWidth: '32rem',
    marginRight: '1rem',

    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
}));
