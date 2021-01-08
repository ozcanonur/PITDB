import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '1rem',
    transition: 'all .05s',
    height: 'max-content',
    borderRadius: '0.5rem',
  },
  checkboxIcon: {
    width: '1.6rem',
    height: '1.6rem',
    border: `1.5px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
    transition: 'all .05s',
  },
  checkboxLabel: {
    marginLeft: '1.2rem',
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
}));
