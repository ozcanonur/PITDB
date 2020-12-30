import { useStyles } from './styles';
import { ProjectItemCardProps } from './types';

const ProjectItemCard = ({ name, children, className, ...props }: ProjectItemCardProps) => {
  const classes = useStyles();

  return (
    <div {...props} className={`${classes.container} ${className}`}>
      <div className={classes.header}>{name}</div>
      {children}
    </div>
  );
};

export default ProjectItemCard;
