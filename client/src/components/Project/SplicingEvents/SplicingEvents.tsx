import SplicingEventsTable from './Table';

import { useStyles } from './styles/splicingEvents';

const SplicingEvents = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SplicingEventsTable />
      <div className={classes.figuresContainer}></div>
    </div>
  );
};

export default SplicingEvents;
