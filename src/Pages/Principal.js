import React from 'react';
import { Link } from 'react-router-dom';

class Principal extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h3>
        <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>
      </div>
    );
  }
}

export default Principal;
