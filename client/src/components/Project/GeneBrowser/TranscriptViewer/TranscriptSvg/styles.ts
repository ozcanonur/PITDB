import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
    overflow: 'clip',
  },
  textContainer: {
    cursor: 'pointer',
  },
  conditionText: {
    fontSize: '0.6rem',
    fontFamily: 'Poppins, sans-serif',
    fill: 'white',
  },
  transcriptText: {
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  rail: {
    fill: theme.palette.primary.main,
  },
  exon: {
    fill: theme.palette.primary.main,
    cursor: 'pointer',

    '&:hover': {
      fill: '#6B88a2',
    },
  },
  tooltipText: {
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    fill: theme.palette.primary.main,
  },
  cds: {
    fill: '#FFDE4D',
    cursor: 'pointer',
  },
  mutation: {
    fill: '#C8553D',
  },
}));
