import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  render() {
    const { cartItensArray } = this.props;
    const { title, price, thumbnail } = cartItensArray;
    return (
      <div>
        {' '}
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-quantity">1</p>
      </div>
    );
  }
}

ItemCart.propTypes = {
  cartItensArray: propTypes.shape({
    title: propTypes.string,
    price: propTypes.string,
    thumbnail: propTypes.string,
  }).isRequired,
};

export default ItemCart;
