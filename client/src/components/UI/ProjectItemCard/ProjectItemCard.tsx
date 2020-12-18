import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    border: '1.5px solid rgba(51, 51, 102, 0.2)',
    borderRadius: '1rem',
    background: 'linear-gradient(to bottom, rgba(51,51,102) 4rem, white 4rem, white)',
  },
  header: {
    // backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '1.4rem',
    height: '3.6rem',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ProjectItemCard = ({ name, children, className, ...props }: any) => {
  const classes = useStyles();

  return (
    <div {...props} className={`${classes.container} ${className}`}>
      <div className={classes.header}>{name}</div>
      {children}
    </div>
  );
};

export default ProjectItemCard;
