import { useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Loading from 'components/UI/Loading/Loading';

const Home = lazy(() => import('components/Home/Home'));
const BrowseWrapper = lazy(() => import('components/Browse/Wrapper'));
const API = lazy(() => import('components/API/API'));
const About = lazy(() => import('components/About/About'));
const Help = lazy(() => import('components/Help/Help'));

const useStyles = makeStyles((theme) => ({
  loading: {
    height: '100vh',
  },
  loadingSvg: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

// Make page scroll to top on every route/url change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={<Loading className={classes.loading} svgProps={{ className: classes.loadingSvg }} />}
      >
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/browse' component={BrowseWrapper} />
          <Route path='/api' component={API} />
          <Route path='/about' component={About} />
          <Route path='/help' component={Help} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
