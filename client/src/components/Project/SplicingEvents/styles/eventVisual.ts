import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  projectItemCard: {
    marginLeft: '2rem',
    width: '100%',
    height: '30rem',
    position: 'relative',
  },
  figureContainer: {
    transition: 'all .3s ease-in-out',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    transition: 'all .3s ease-in-out',
  },
  img: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '11rem',
  },
  chr: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-11.3rem',
  },
  imgArrow: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-9.6rem',
    height: '2.3rem',
  },
  positions: {
    position: 'absolute',
    left: '50%',
    top: '47%',
    transform: 'translate(-50%, -50%)',
    width: '42rem',
    display: 'flex',
    flexDirection: 'column',
    height: '8rem',
    justifyContent: 'space-between',
  },
  topPositions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 13rem',
  },
  bottomPositions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  position: {
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
}));
