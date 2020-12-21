import DifferentialGeneExpressionTable from './Table';

import { useStyles } from './styles/differentialGeneExpression';

const DifferentialGeneExpression = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DifferentialGeneExpressionTable />
    </div>
  );
};

export default DifferentialGeneExpression;
