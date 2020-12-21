import DGETable from './Table';
import BarChart from './BarChart';
import VolcanoPlot from './VolcanoPlot';

import { useStyles } from './styles/dge';

const DGE = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DGETable />
      <div className={classes.figuresContainer}>
        <VolcanoPlot />
        <BarChart />
      </div>
    </div>
  );
};

export default DGE;
