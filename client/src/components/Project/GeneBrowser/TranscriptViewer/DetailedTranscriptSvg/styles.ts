import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
    marginRight: '2rem',
  },
  nucleotide: {
    fontFamily: 'Poppins, sans-serif',
    fill: 'white',
    textAnchor: 'middle',
  },
  codon: {
    fontFamily: 'Poppins, sans-serif',
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
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.8)',
  },
  mod: {
    fill: 'rgba(40, 82, 56, 0.7)',
  },
}));
