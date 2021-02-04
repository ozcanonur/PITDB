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
    paddingLeft: '1rem',
    marginTop: 30,
  },
  transcriptNameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minWidth: '21.4rem',
  },
  transcriptLabelCondition: {
    padding: '0.8rem 1rem',
    borderRadius: '0.3rem',
    color: 'white',
    fontSize: '1.4rem',
    textAlign: 'center',
    height: 30,
    minWidth: '4rem',
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
  delMutationLine: {
    stroke: 'black',
    strokeWidth: 2,
  },
  snpGroup: {
    animationName: 'bounce',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  delGroup: {
    animationName: 'fadeOutNoTranslate',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  insRect: {
    animationName: 'slide-right-small',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
}));
