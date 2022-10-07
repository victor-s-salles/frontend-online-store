import React from 'react';
import propTypes from 'prop-types';
import ItemCart from '../components/ItemCart';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false };
  }

  componentDidMount() {
    this.validadeItens();
  }

  validadeItens = () => {
    const { cartItensArray } = this.props;
    if (!cartItensArray.length < 1) {
      this.setState({ temAlgo: true });
    }
  };

  render() {
    const { cartItensArray } = this.props;
    const { temAlgo } = this.state;
    return (
      <div>
        {!temAlgo && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {temAlgo
          && cartItensArray.map((item, index) => (
            <ItemCart key={ index } cartItensArray={ item } />
          ))}
      </div>
    );
  }
}

Cart.propTypes = {
  cartItensArray: propTypes.arrayOf.isRequired,
};

export default Cart;
