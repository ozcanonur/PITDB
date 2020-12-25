import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import MutationsWrapper from './Mutations/Wrapper';
import DGEWrapper from './DGE/Wrapper';
import SplicingEventsWrapper from './SplicingEvents/Wrapper';
import TranscriptUsageWrapper from './TranscriptUsage/Wrapper';

import { useStyles } from './styles';

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
          <SplicingEventsWrapper />
        </Route>
        <Route path={`${match.path}/transcriptUsage`}>
          <TranscriptUsageWrapper />
        </Route>
      </Switch>
    </div>
  );
};

export default Project;
