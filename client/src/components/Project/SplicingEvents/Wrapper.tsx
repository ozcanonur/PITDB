import SplicingEventsTable from './Table/Table';
import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import EventVisual from './EventVisual/EventVisual';

import { useStyles } from './styles';

const SplicingEventsWrapper = () => {
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

export default SplicingEventsWrapper;
