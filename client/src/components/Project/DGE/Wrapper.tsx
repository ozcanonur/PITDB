import DGETable from './Table/Table';
import BarChart from './BarChart/BarChart';
import VolcanoPlot from './VolcanoPlot/VolcanoPlot';

import { useStyles } from './styles';

const DGEWrapper = () => {
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

export default DGEWrapper;
