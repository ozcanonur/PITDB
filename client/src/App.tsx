import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from 'components/Home/Home';
import Browse from 'components/Browse/Browse';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/browse' component={Browse} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
