import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Principal from './Pages/Principal';
import Cart from './Pages/Cart';
import ProdutoDetalhado from './components/ProdutoDetalhado';
import Checkout from './Pages/Checkout';
// import { recuperaProdutos } from './localStorage/localStorage';

class Router extends React.Component {
  // getCartItensArray = (itemObj) => {
  //   const { cartItensArray } = this.state;
  //   const arrayObjItens = [...cartItensArray];
  //   arrayObjItens.push(itemObj);
  //   this.setState({
  //     cartItensArray: arrayObjItens,
  //   });
  // };

  render() {
    // const { cartItensArray } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Principal }
        />
        <Route
          path="/cart"
          component={ Cart }
        />
        <Route
          path="/checkout"
          component={ Checkout }
        />
        <Route path="/produtoDetalhado/:id" component={ ProdutoDetalhado } />

      </Switch>
    );
  }
}

export default Router;
