import { Switch, Route, useRouteMatch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Sidebar from './Sidebar/Sidebar';
import Mutations from './Mutations/Mutations';
import DGE from './DGE/DGE';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff',
  },
}));

const Project = () => {
  const classes = useStyles();

  const match = useRouteMatch();

  return (
    <div className={classes.container}>
      <Sidebar />
      <Switch>
        <Route path={`${match.path}/mutations`}>
          <Mutations />
        </Route>
        <Route path={`${match.path}/differentialGeneExpression`}>
          <DGE />
        </Route>
      </Switch>
    </div>
  );
};

export default Project;
