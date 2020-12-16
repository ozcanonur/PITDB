import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import Home from 'components/Home/Home';
import Browse from 'components/Browse/Browse';
import API from 'components/API/API';
import About from 'components/About/About';
import Help from 'components/Help/Help';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/api' component={API} />
        <Route path='/about' component={About} />
        <Route path='/help' component={Help} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
