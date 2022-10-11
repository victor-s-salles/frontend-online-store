import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantidade: 1,
    };
  }

  aumentar = () => {
    this.setState((prevState) => ({
      quantidade: prevState.quantidade + 1,
    }));
  };

  diminuir = () => {
    this.setState((prevState) => {
      if (prevState.quantidade <= 1) {
        return { quantidade: 1 };
      }
      return { quantidade: prevState.quantidade - 1 };
    });
  };

  render() {
    // const { decreaseItem, increaseItem, quantity, thumbnail_id} =
    const { cartItensArray,
      removeItem } = this.props;
    const { title, price, thumbnail, id } = cartItensArray;
    const { quantidade } = this.state;

    return (
      <div>
        {' '}
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-quantity">
          {quantidade}
        </p>
        <div>
          <button
            onClick={ () => { this.aumentar(); } }
            data-testid="product-increase-quantity"
            type="button"
          >
            +

          </button>
          <button
            onClick={ () => { this.diminuir(); } }
            data-testid="product-decrease-quantity"
            type="button"
          >
            -

          </button>
          <button
            onClick={ () => { removeItem(id); } }
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
  // increaseItem: propTypes.func.isRequired,
  // decreaseItem: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
  // quantity: propTypes.number.isRequired,

};

export default ItemCart;
