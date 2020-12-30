import { useEffect } from 'react';
import AOS from 'aos';

import MutationsTable from './Table/Table';
import BarCharts from './BarCharts/BarCharts';
import PieChart from './PieChart/PieChart';

import { useStyles } from './styles';

const MutationsWrapper = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <MutationsTable data-aos='fade-in' />
      <div className={classes.figuresContainer} data-aos='fade-in'>
        <PieChart />
        <BarCharts />
      </div>
    </div>
  );
};

export default MutationsWrapper;
