import SplicingEventsTable from './Table';

import PieChart from './PieChart';
import BarChart from './BarChart';
import EventVisual from './EventVisual';

import { useStyles } from './styles/splicingEvents';

const SplicingEvents = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SplicingEventsTable />
      <div className={classes.figuresContainer}>
        <PieChart />
        <BarChart />
        <EventVisual />
      </div>
    </div>
  );
};

export default SplicingEvents;
