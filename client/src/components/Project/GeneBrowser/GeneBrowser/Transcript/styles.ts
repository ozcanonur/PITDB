import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
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
    transition: 'all .1s',

    '&:hover': {
      fill: '#6b88a2',
    },
  },
  tooltipText: {
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    fill: theme.palette.primary.main,
  },
  cds: {
    fill: '#FFDE4D',
  },
  mutation: {
    fill: '#ED0909',
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.6)',
  },
}));
