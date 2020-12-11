import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(-3.8rem)',

    '& > div:nth-child(1)': {
      zIndex: 4,
      transform: 'translateX(8.1rem)',
      '& div': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '& > div:nth-child(2)': {
      zIndex: 3,
      transform: 'translateX(5.4rem)',
      '& div': {
        backgroundColor: '#8A8E9B',
      },
    },
    '& > div:nth-child(3)': {
      zIndex: 2,
      transform: 'translateX(2.7rem)',
      '& div': {
        backgroundColor: '#9999FF',
      },
    },
  },
  flowImgContainer: {
    position: 'relative',
  },
  flowSquare: {
    height: '15rem',
    width: '26rem',
    display: 'inline-block',
    padding: '2rem 3rem',
    boxShadow: '0 5px 10px rgba(154,160,185,.1), 0 15px 40px rgba(166,173,201,.2)',
  },
  flowTriangle: {
    height: '15rem',
    width: '5rem',
    display: 'inline-block',
    clipPath: 'polygon(70% 50%, 0 0, 0 100%)',
  },
  flowShapeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  flowContentHeading: {
    display: 'flex',
    alignItems: 'flex-end',
    color: 'white',
    fontSize: '1.8rem',
  },
  flowContentImg: {
    height: '2.4rem',
    marginRight: '1.4rem',
  },
  flowContentList: {
    marginTop: '1.8rem',
    marginLeft: '2rem',

    '& li:not(:last-child)': {
      marginBottom: '1rem',
    },
  },
  flowText: {
    color: 'white',
    fontSize: '1.4rem',
  },
  flowShapeContainerVertical: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    transform: 'translateY(5rem)',
  },
  flowSquareVertical: {
    height: 'max-content',
    width: '23rem',
    display: 'inline-block',
    padding: '2.5rem 3rem',
    backgroundColor: theme.palette.primary.dark,
  },
  flowTriangleVertical: {
    height: '12rem',
    width: '23rem',
    display: 'inline-block',
    clipPath: 'polygon(50% 30%, 0 0, 100% 0)',
    backgroundColor: theme.palette.primary.dark,
  },
}));