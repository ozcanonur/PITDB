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
  cdsIntronLine: {
    stroke: theme.palette.secondary.light,
  },
  rail: {
    stroke: theme.palette.primary.main,
  },
  divider: {
    stroke: theme.palette.primary.main,
    strokeWidth: 0.8,
  },
  peptide: {
    fill: 'rgba(200, 85, 61, 0.7)',
  },
  peptideInIntron: {
    stroke: 'rgba(200, 85, 61, 0.7)',
  },
  mod: {
    fill: 'rgba(40, 82, 56, 0.7)',
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
  },
  transcriptLabelId: {
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
  tooltipText: {
    fill: theme.palette.primary.main,
  },
  tooltipRect: {
    fill: '#eceef7',
    rx: 4,
  },
  conditions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > div:first-of-type': {
      borderTopLeftRadius: '0.3rem',
      borderBottomLeftRadius: '0.3rem',
    },

    '& > div:last-of-type': {
      borderTopRightRadius: '0.3rem',
      borderBottomRightRadius: '0.3rem',
    },
  },
  condition: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  conditionText: {
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'end',
  },
}));
