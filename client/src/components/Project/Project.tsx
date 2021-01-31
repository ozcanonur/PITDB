import { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Sidebar from './Sidebar/Sidebar';
import MutationsWrapper from './Mutations/Wrapper';
import DGEWrapper from './DGE/Wrapper';
import SplicingEventsWrapper from './SplicingEvents/Wrapper';
import TranscriptUsageWrapper from './TranscriptUsage/Wrapper';
import GeneBrowserWrapper from './GeneBrowser/Wrapper';
import PeptideMapsWrapper from './PeptideMaps/Wrapper';

import { fetchFromApi } from 'utils';
import { setConditionTypes } from 'actions';

import { useStyles } from './styles';

const Project = () => {
  const classes = useStyles();

  const { path, params } = useRouteMatch();

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    // @ts-ignore
    fetchFromApi('/api/misc/condition-types', { project: params.project }).then((res) => {
      if (!res || !isMounted) return;

      dispatch(setConditionTypes(res));
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
