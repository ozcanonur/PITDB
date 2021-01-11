import MutationsTable from './Table/Table';
import BarCharts from './BarCharts/BarCharts';
import PieChart from './PieChart/PieChart';

import { useStyles } from './styles';

const MutationsWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MutationsTable />
      <div className={classes.figuresContainer}>
        <PieChart />
        <BarCharts />
      </div>
    </div>
  );
};

export default MutationsWrapper;
