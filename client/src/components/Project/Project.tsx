import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import MutationsWrapper from './Mutations/Wrapper';
import DGEWrapper from './DGE/Wrapper';
import SplicingEventsWrapper from './SplicingEvents/Wrapper';
import TranscriptUsageWrapper from './TranscriptUsage/Wrapper';
import GeneBrowserWrapper from './GeneBrowser/Wrapper';
import PeptideMapsWrapper from './PeptideMaps/Wrapper';

import { useStyles } from './styles';

const Project = () => {
  const classes = useStyles();

  const { path } = useRouteMatch();

  const routes = [
    {
      routePath: `${path}/mutations`,
      component: MutationsWrapper,
    },
    {
      routePath: `${path}/differential-gene-expression`,
      component: DGEWrapper,
    },
    {
      routePath: `${path}/splicing-events`,
      component: SplicingEventsWrapper,
    },
    {
      routePath: `${path}/transcript-usage`,
      component: TranscriptUsageWrapper,
    },
    {
      routePath: `${path}/mutations`,
      component: MutationsWrapper,
    },
    {
      routePath: `${path}/gene-browser`,
      component: GeneBrowserWrapper,
    },
    {
      routePath: `${path}/peptide-maps`,
      component: PeptideMapsWrapper,
    },
  ];

  return (
    <div className={classes.container}>
      <Sidebar />
      <Switch>
        {routes.map(({ routePath, component }) => (
          <Route key={routePath} path={routePath} component={component} />
        ))}
      </Switch>
    </div>
  );
};

export default Project;
