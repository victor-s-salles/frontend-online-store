import React from 'react';
import propTypes from 'prop-types';
import { quantity } from '../localStorage/localStorage';

class ItemCart extends React.Component {
  render() {
    const { cartItensArray } = this.props;
    const { title, price, thumbnail, id } = cartItensArray;
    return (
      <div>
        {' '}
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-quantity">
          {quantity(id) !== null ? quantity(id) : 1}
        </p>
      </div>
    );
  }
}

ItemCart.propTypes = {
  cartItensArray: propTypes.shape({
    title: propTypes.string,
    price: propTypes.number,
    thumbnail: propTypes.string,
    id: propTypes.string,
  }).isRequired,
};

export default ItemCart;
