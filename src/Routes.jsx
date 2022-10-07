import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Principal from './Pages/Principal';
import Cart from './Pages/Cart';
import ProdutoDetalhado from './components/ProdutoDetalhado';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Principal } />
        <Route path="/cart" component={ Cart } />
        <Route path="/produtoDetalhado/:id" component={ ProdutoDetalhado } />
      </Switch>
    );
  }
}

export default Router;
