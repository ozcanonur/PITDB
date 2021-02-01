import DGETable from './Table/Table';
import BarChart from './BarChart/BarChart';
import VolcanoPlot from './VolcanoPlot/VolcanoPlot';

import { useStyles } from './styles';

const DGEWrapper = () => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <DGETable />
      <section className={classes.figuresContainer}>
        <VolcanoPlot />
        <BarChart />
      </section>
    </main>
  );
};

export default DGEWrapper;
