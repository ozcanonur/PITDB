import DGETable from './Table';

import { useStyles } from './styles/dge';

const DGE = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DGETable />
    </div>
  );
};

export default DGE;
