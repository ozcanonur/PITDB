import { useEffect } from 'react';
import AOS from 'aos';

import SplicingEventsTable from './Table';
import PieChart from './PieChart';
import BarChart from './BarChart';
import EventVisual from './EventVisual';

import { useStyles } from './styles/splicingEvents';

const SplicingEvents = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <SplicingEventsTable data-aos='fade-in' />
      <div className={classes.figuresContainer} data-aos='fade-in'>
        <PieChart />
        <BarChart />
        <EventVisual />
      </div>
    </div>
  );
};

export default SplicingEvents;
