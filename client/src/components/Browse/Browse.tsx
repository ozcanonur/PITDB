import { useEffect } from 'react';
import AOS from 'aos';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Project from 'components/Project/Project';

import Examples from './Examples';
import Experiments from './Experiments';

import { useStyles } from './styles/browse';

const Browse = () => {
  const classes = useStyles();

  let match = useRouteMatch();

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.path}/:projectId`}>
          <Project />
        </Route>
        <Route path={match.path}>
          <div className={classes.container}>
            <main className={classes.browse}>
              <div className={classes.headingContainer} data-aos='fade-in'>
                <h2 className={classes.heading}>Browse</h2>
                <p className={classes.subHeading}>Check out the examples or search for a specific experiment below.</p>
              </div>
              <Examples />
              <Experiments />
              <Footer />
            </main>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default Browse;
