import { useStyles } from './styles/projectItemCard';

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
