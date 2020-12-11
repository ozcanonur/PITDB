import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from 'components/Home/Home';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
