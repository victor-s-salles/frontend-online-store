import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Principal from './Pages/Principal';
import Cart from './Pages/Cart';

class Router extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItensArray: [],
    };
  }

  getCartItensArray = (itemObj) => {
    const { cartItensArray } = this.state;
    const arrayObjItens = [...cartItensArray];
    arrayObjItens.push(itemObj);
    this.setState({
      cartItensArray: arrayObjItens,
    });
  };

  render() {
    const { cartItensArray } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<Principal
            getCartItensArray={ this.getCartItensArray }
          />) }
        />
        <Route
          path="/cart"
          render={ () => (<Cart
            cartItensArray={ cartItensArray }
          />) }
        />
      </Switch>
    );
  }
}

export default Router;
