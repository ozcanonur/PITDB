import MutationsTable from './Table';
import BarCharts from './BarCharts';
import PieChart from './PieChart';

import { useStyles } from './styles/mutations';

const Mutations = () => {
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

export default Mutations;
