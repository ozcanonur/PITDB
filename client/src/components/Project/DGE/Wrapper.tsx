import DGETable from './Table/Table';
import BarChart from './BarChart/BarChart';
import VolcanoPlot from './VolcanoPlot/VolcanoPlot';
import LineChart from './LineChart/LineChart';

import { useStyles } from './styles';

const DGEWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <main className={classes.subContainer}>
        <DGETable />
        <section className={classes.figuresContainer}>
          <VolcanoPlot />
          <BarChart />
        </section>
      </main>
      <div style={{ display: 'flex' }}>
        <LineChart />
        <div className={classes.placeholderDiv} />
      </div>
    </div>
  );
};

export default DGEWrapper;
