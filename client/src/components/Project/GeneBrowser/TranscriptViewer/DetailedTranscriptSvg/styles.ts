import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
    height: '5rem',
  },
  nucleotide: {
    fontSize: '1.8rem',
    fontFamily: 'Poppins, sans-serif',
    fill: 'white',
  },
  codon: {
    fontSize: '1.8rem',
    fontFamily: 'Poppins, sans-serif',
    fill: '#1b2742',
  },
}));
