import DGETable from './Table';
import BarCharts from './BarCharts';

import { useStyles } from './styles/dge';

const DGE = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DGETable />
      <div className={classes.figuresContainer}>
        <BarCharts />
      </div>
    </div>
  );
};

export default DGE;
