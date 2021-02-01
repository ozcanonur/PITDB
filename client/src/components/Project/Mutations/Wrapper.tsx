import MutationsTable from './Table/Table';
import BarCharts from './BarCharts/BarCharts';
import PieChart from './PieChart/PieChart';

import { useStyles } from './styles';

const MutationsWrapper = () => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <MutationsTable />
      <section className={classes.figuresContainer}>
        <PieChart />
        <BarCharts />
      </section>
    </main>
  );
};

export default MutationsWrapper;
