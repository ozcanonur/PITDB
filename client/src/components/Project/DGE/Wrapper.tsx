import { useEffect } from 'react';
import AOS from 'aos';

import DGETable from './Table/Table';
import BarChart from './BarChart/BarChart';
import VolcanoPlot from './VolcanoPlot/VolcanoPlot';

import { useStyles } from './styles';

const DGEWrapper = () => {
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

export default DGEWrapper;
