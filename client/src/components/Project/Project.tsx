import { Switch, Route, useRouteMatch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Sidebar from './Sidebar/Sidebar';
import MutationsWrapper from './Mutations/Wrapper';
import DGEWrapper from './DGE/Wrapper';
import SplicingEvents from './SplicingEvents/SplicingEvents';
import TranscriptUsage from './TranscriptUsage/TranscriptUsage';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, 25% #fff, #f2f4ff',
    flexGrow: 1,
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
          <MutationsWrapper />
        </Route>
        <Route path={`${match.path}/differentialGeneExpression`}>
          <DGEWrapper />
        </Route>
        <Route path={`${match.path}/splicingEvents`}>
          <SplicingEvents />
        </Route>
        <Route path={`${match.path}/transcriptUsage`}>
          <TranscriptUsage />
        </Route>
      </Switch>
    </div>
  );
};

export default Project;
