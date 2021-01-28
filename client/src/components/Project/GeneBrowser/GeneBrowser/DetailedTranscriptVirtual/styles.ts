import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
    marginRight: '2rem',
  },
  nucleotide: {
    fill: 'white',
    textAnchor: 'middle',
  },
  aminoacid: {
    fill: '#1b2742',
    textAnchor: 'middle',
  },
  cdsBackground: {
    fill: theme.palette.secondary.light,
  },
  rail: {
    stroke: theme.palette.primary.main,
    strokeWidth: 2,
  },
  divider: {
    stroke: theme.palette.primary.main,
    strokeWidth: 0.8,
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.6)',
  },
  mod: {
    fill: 'rgba(40, 82, 56, 0.7)',
    cursor: 'pointer',
  },

  detailedTranscriptContainer: {
    width: '100%',
  },
  emptyNucleotideLine: {
    stroke: theme.palette.primary.main,
    strokeWidth: 2,
  },
}));
