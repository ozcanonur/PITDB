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
    fill: 'rgba(200, 85, 61, 0.7)',
  },
  mod: {
    fill: 'rgba(40, 82, 56, 0.7)',
    cursor: 'pointer',
  },
  detailedTranscriptContainer: {
    display: 'flex',
  },
  detailedTranscript: {
    flexGrow: 1,
  },
  transcriptLabelContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2rem',
  },
  transcriptNameContainer: {
    display: 'flex',
    justifyContent: 'space-between',

    alignItems: 'flex-start',
    minWidth: '24rem',
  },
  transcriptLabelCondition: {
    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
    height: 30,
  },
  transcriptLabelId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    paddingTop: '0.7rem',
  },
  transcriptProperty: {
    fontSize: '1.4rem',
    textAlign: 'right',
    color: theme.palette.primary.main,
    height: 30,
    paddingTop: '0.7rem',
  },
  virtualizedList: {
    overflow: 'hidden !important',
  },
  nucleotideContainer: {
    animation: 'bounce 1s',
  },
}));
