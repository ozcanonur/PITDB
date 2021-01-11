import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  legend: {
    marginLeft: '5rem',
    display: 'flex',

    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    fontWeight: 500,

    '& > div': {
      display: 'flex',
      alignItems: 'center',

      '&:not(:last-child)': {
        marginBottom: '1.5rem',
      },

      '& > div:first-of-type': {
        height: '1.4rem',
        width: '1.4rem',
        marginRight: '1rem',
        borderRadius: '2px',
      },
    },
  },
}));
