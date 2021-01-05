import { HTMLAttributes } from 'react';
import { useStyles } from './styles';

const NoResults = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${className}`} {...props}>
      <div className={classes.heading}>No results found.</div>
      <div className={classes.subHeading}>Try changing the filters above.</div>
    </div>
  );
};

export default NoResults;
