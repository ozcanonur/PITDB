import { HTMLAttributes } from 'react';
import { useStyles } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  subHeading?: string;
}

const NoResults = ({
  heading = 'No results found.',
  subHeading = 'Try changing the filters',
  className,
  ...props
}: Props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${className}`} {...props}>
      <div className={classes.heading}>{heading}</div>
      <div className={classes.subHeading}>{subHeading}</div>
    </div>
  );
};

export default NoResults;
