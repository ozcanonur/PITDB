import { useStyles } from './styles';

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
