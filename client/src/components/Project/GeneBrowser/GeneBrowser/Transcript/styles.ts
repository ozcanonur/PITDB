import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    stroke: theme.palette.primary.main,
  },
  exon: {
    fill: theme.palette.primary.main,
  },
  tooltipText: {
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    fill: theme.palette.primary.main,
  },
  cdsLine: {
    stroke: '#FFDE4D',
    strokeWidth: 1,
  },
  cdsRect: {
    fill: '#FFDE4D',
  },
  mutation: {
    fill: '#ED0909',
    zIndex: 9999,
  },
  peptideLine: {
    stroke: 'rgba(200, 85, 61, 0.6)',
    strokeWidth: 1,
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.6)',
  },
  mod: {
    fill: 'rgba(40, 82, 56, 0.7)',
  },
}));
