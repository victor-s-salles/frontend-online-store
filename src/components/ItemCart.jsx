import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  render() {
    const { cartItensArray, decreaseItem,
      increaseItem, removeItem, quantity } = this.props;
    const { title, price, thumbnail, thumbnail_id } = cartItensArray;

    return (
      <div>
        {' '}
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-quantity">
          {quantity}
        </p>
        <div>
          <button
            onClick={ () => { increaseItem(thumbnail_id); } }
            data-testid="product-increase-quantity"
            type="button"
          >
            +

          </button>
          <button
            onClick={ () => { decreaseItem(thumbnail_id); } }
            data-testid="product-decrease-quantity"
            type="button"
          >
            -

          </button>
          <button
            onClick={ () => { removeItem(thumbnail_id); } }
            data-testid="remove-product"
            type="button"
          >
            Remover

          </button>
        </div>
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
    thumbnail_id: propTypes.string,
  }).isRequired,
  increaseItem: propTypes.func.isRequired,
  decreaseItem: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
  quantity: propTypes.number.isRequired,

};

export default ItemCart;
