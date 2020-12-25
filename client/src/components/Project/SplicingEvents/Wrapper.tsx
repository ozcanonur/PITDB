import { useEffect } from 'react';
import AOS from 'aos';

import SplicingEventsTable from './Table/Table';
import PieChart from './PieChart/PieChart';
import BarChart from './BarChart/BarChart';
import EventVisual from './EventVisual/EventVisual';

import { useStyles } from './styles';

const SplicingEventsWrapper = () => {
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

export default SplicingEventsWrapper;
