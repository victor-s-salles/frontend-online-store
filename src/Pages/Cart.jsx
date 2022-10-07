import React from 'react';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false };
  }

  render() {
    const { temAlgo } = this.state;
    return (
      <div>
        { temAlgo
          ? <div />
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default Cart;
