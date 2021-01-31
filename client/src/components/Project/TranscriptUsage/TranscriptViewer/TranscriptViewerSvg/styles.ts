import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  svg: {
    direction: 'ltr',
  },
  transcriptText: {
    color: '#336',
    fill: '#336',
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
  },
  selectedTranscriptBgRect: {
    fill: 'rgba(51, 51, 102, 0.1)',
  },
  exon: {
    cursor: 'pointer',
  },
  exonTooltipText: {
    fontSize: '0.65rem',
    fontFamily: 'Poppins, sans-serif',
    fill: '#336',
  },
}));
