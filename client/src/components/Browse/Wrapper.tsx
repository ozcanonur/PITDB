import { useEffect } from 'react';
import AOS from 'aos';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Header from 'components/Header/Header';
import BrowseMain from './BrowseMain/BrowseMain';
import Project from 'components/Project/Project';

const BrowseWrapper = () => {
  const match = useRouteMatch();

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.path}/project/:project`} component={Project} />
        <Route component={BrowseMain} />
      </Switch>
    </>
  );
};

export default BrowseWrapper;
