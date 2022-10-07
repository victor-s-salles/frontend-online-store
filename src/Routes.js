import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Principal from './Pages/Principal';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Principal } />
      </Switch>
    );
  }
}

export default Router;
