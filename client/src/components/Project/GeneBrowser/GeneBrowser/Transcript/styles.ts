import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    cursor: 'crosshair',
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
  cds: {
    fill: '#FFDE4D',
  },
  mutation: {
    fill: '#ED0909',
    zIndex: 9999,
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.6)',
  },
}));
