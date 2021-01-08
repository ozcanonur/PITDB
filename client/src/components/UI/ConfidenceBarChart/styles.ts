import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  line: {
    stroke: 'rgba(65, 15, 94, 0.8)',
    strokeWidth: 2.5,
    transition: 'all .4s',
  },
  point: {
    fill: 'rgba(65, 15, 94, 0.8)',
    transition: 'all .4s',
  },
}));
