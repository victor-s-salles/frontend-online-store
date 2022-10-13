import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantidade: 1,
      btnDisabled: false,
    };
  }

  componentDidMount() {
    const { cartItensArray } = this.props;
    const { quantidade } = this.state;
    if (cartItensArray.available_quantity === (quantidade)) {
      this.setState({ btnDisabled: true });
    } else { this.setState({ btnDisabled: false }); }
    this.recuperarQuantidade();
  }

  recuperarQuantidade = () => {
    const { cartItensArray } = this.props;
    const { id } = cartItensArray;

    const quantidade = localStorage.getItem(`quantidade:${id}`);
    if (quantidade != null) {
      this.setState({ quantidade: Number(quantidade) });
    }
  };

  aumentar = () => {
    const { cartItensArray } = this.props;
    const { quantidade } = this.state;
    this.setState(
      (prevState) => ({ quantidade: prevState.quantidade + 1 }),
      this.salvarLocalStorage,
    );

    if (cartItensArray.available_quantity <= (quantidade + 1)) {
      this.setState({ btnDisabled: true });
    }
  };

  diminuir = () => {
    const { cartItensArray } = this.props;
    const { quantidade } = this.state;
    this.setState((prevState) => {
      if (prevState.quantidade <= 1) {
        return { quantidade: 1 };
      }
      return { quantidade: prevState.quantidade - 1 };
    }, this.salvarLocalStorage);
    if (cartItensArray.available_quantity > (quantidade - 1)) {
      this.setState({ btnDisabled: false });
    }
  };

  salvarLocalStorage = () => {
    const { quantidade } = this.state;
    const { cartItensArray } = this.props;
    const { id } = cartItensArray;

    localStorage.setItem(`quantidade:${id}`, Number(quantidade));
  };

  render() {
    const { cartItensArray, removeItem } = this.props;
    const { title, price, thumbnail, id } = cartItensArray;
    const { quantidade, btnDisabled } = this.state;

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
            disabled={ btnDisabled }
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
    available_quantity: propTypes.number,
  }).isRequired,
  // increaseItem: propTypes.func.isRequired,
  // decreaseItem: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
  // quantity: propTypes.number.isRequired,

};

export default ItemCart;
