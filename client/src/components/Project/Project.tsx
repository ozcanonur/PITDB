import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Sidebar from './Sidebar/Sidebar';
import Mutations from './Mutations/Mutations';
import DifferentialGeneExpression from './DifferentialGeneExpression/DifferentialGeneExpression';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff',
  },
}));

const Project = () => {
  const classes = useStyles();

  const match = useRouteMatch();
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className={classes.container}>
      <Sidebar projectId={projectId} />
      <Switch>
        <Route path={`${match.path}/mutations`}>
          <Mutations />
        </Route>
        <Route path={`${match.path}/differentialGeneExpression`}>
          <DifferentialGeneExpression />
        </Route>
      </Switch>
    </div>
  );
};

export default Project;
