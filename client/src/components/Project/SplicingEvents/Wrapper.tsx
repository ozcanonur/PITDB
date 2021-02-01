import SplicingEventsTable from './Table/Table';
import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import EventVisual from './EventVisual/EventVisual';

import { useStyles } from './styles';

const SplicingEventsWrapper = () => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <SplicingEventsTable />
      <section className={classes.figuresContainer}>
        <PieChart />
        <BarChart />
        <EventVisual />
      </section>
    </main>
  );
};

export default SplicingEventsWrapper;
