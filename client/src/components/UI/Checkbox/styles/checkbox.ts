import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: '1.6rem',
    height: '1.6rem',
    border: `1.4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1px',
    transition: 'all .05s',
    boxShadow: '0 1px 1.5px rgba(154,160,185,.1), 0 2px 3px rgba(166,173,201,.2)',
  },
  checkboxLabel: {
    marginLeft: '1.2rem',
    fontSize: '1.6rem',
    color: theme.palette.primary.main,
  },
}));
