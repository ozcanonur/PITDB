import { useStyles } from './styles';
import { ProjectItemCardProps } from './types';

const ProjectItemCard = ({ name, children, className, ...props }: ProjectItemCardProps) => {
  const classes = useStyles();

  return (
    <section {...props} className={`${classes.container} ${className}`}>
      <div className={classes.header}>{name}</div>
      {children}
    </section>
  );
};

export default ProjectItemCard;
