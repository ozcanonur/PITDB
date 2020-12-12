import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTop: '1px solid rgba(94, 112, 157, 0.4)',
    marginTop: '10rem',
    padding: '0.5rem 2rem',
  },
  copyrightPrivacyContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#5E709D',
    fontSize: '1.5rem',
    fontWeight: 400,
    paddingTop: '1rem',
  },
  copyrightText: {
    paddingBottom: '0.5rem',
  },
  privacyButton: {
    marginLeft: '4rem',
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    paddingBottom: '0.5rem',
    transition: 'all .2s',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  bessantLab: {
    height: '9rem',
    paddingTop: '1rem',
  },
}));
