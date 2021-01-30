import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    display: 'flex',
  },
  transcriptLabelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '2rem',
    alignItems: 'flex-start',
    paddingTop: '0.85rem',
    minWidth: '24rem',
  },
  transcriptLabelCondition: {
    marginRight: '5.5rem',
    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    width: '4rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
  },
  transcriptLabelId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
  virtualizedList: {
    overflow: 'hidden !important',
  },
}));
