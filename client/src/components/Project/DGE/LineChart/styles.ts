import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    flexGrow: 1,
    position: 'relative',
    marginRight: '2rem',
    minHeight: '35rem',

    '@media (max-width: 1850px)': {
      marginLeft: 0,
      width: 'auto',
      flex: '1 1',
      marginRight: '1rem',
    },
  },
  lineChartContainer: {
    height: '30rem',
    transition: 'all .3s ease-in-out',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
  noResults: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
  },
  legend: {
    marginLeft: '2rem',
    marginBottom: '1rem',
    marginTop: '1rem',

    '& > div': {
      marginBottom: '1.5rem',

      '& > div': {
        borderRadius: '50% !important',
      },
    },
  },
  tooltipSvg: {
    backgroundColor: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 5px 10px rgba(154,160,185,.25), 0 15px 40px rgba(166,173,201,.35)',
  },
  tooltipText: {
    fontSize: '1.2rem',
    fill: theme.palette.primary.main,
  },
}));
