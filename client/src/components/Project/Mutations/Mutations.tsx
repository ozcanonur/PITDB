import { useEffect } from 'react';
import AOS from 'aos';

import MutationsTable from './Table';
import BarCharts from './BarCharts';
import PieChart from './PieChart';

import { useStyles } from './styles/mutations';

const Mutations = () => {
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

export default Mutations;
