import { useEffect } from 'react';
import AOS from 'aos';

import DGETable from './Table';
import BarChart from './BarChart';
import VolcanoPlot from './VolcanoPlot';

import { useStyles } from './styles/dge';

const DGE = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <DGETable data-aos='fade-in' />
      <div className={classes.figuresContainer} data-aos='fade-in'>
        <VolcanoPlot />
        <BarChart />
      </div>
    </div>
  );
};

export default DGE;
