import { useStyles } from './styles';

const NoResults = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heading}>No results found.</div>
      <div className={classes.subHeading}>Try changing the filters above.</div>
    </div>
  );
};

export default NoResults;
