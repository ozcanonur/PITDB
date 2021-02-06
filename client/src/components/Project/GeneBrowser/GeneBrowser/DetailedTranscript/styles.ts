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
    direction: 'ltr',
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
    minWidth: '23rem',
    paddingLeft: '3rem',
  },
  transcriptLabelCondition: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.3rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
  },
  transcriptLabelId: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
  transcriptProperty: {
    fontSize: '1.4rem',
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
  delGroup: {
    animationName: 'fadeOutNoTranslate',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  delRect: {
    fill: 'red',
  },
  delGroupLine: {
    stroke: 'red',
    strokeWidth: 2,
  },
  insGroup: {
    animationName: 'slide-right-small',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  insRect: {
    fill: 'rgba(0, 128, 0, 0.7)',
  },
  insText: {
    fill: 'white',
    textAnchor: 'middle',
  },
  snpGroup: {
    animationName: 'bounce',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  snpRect: {
    fill: '#83502e',
  },
}));
