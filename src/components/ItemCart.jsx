import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantidade: 1,
      btnDisabled: false,
      btnNegative: false,
    };
  }

  componentDidMount() {
    const { cartItensArray } = this.props;
    if (cartItensArray.available_quantity === 1) {
      this.setState({ btnDisabled: true, btnNegative: true });
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
    const { cartItensArray, calculaTotaldoCarrinho } = this.props;
    const { quantidade } = this.state;
    this.setState(
      (prevState) => ({ quantidade: prevState.quantidade + 1 }),
      this.salvarLocalStorage,
    );

    if (cartItensArray.available_quantity <= (quantidade + 1)) {
      this.setState({ btnDisabled: true });
    }
    calculaTotaldoCarrinho();
  };

  diminuir = () => {
    const { cartItensArray, calculaTotaldoCarrinho } = this.props;
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
    calculaTotaldoCarrinho();
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
    const { quantidade, btnDisabled, btnNegative } = this.state;

    return (
      <div className="ItemCartDivPrincipal">
        <div className="ItemCartDivRemoveButton">
          <button
            onClick={ () => { removeItem(id); } }
            data-testid="remove-product"
            type="button"

          >
            X

          </button>
        </div>
        <img src={ thumbnail } alt={ title } />
        <div className="ItemCartTitleDiv">
          <p data-testid="shopping-cart-product-name">{title}</p>
        </div>

        <div className="ItemCartDivButtons">

          <button
            onClick={ () => { this.diminuir(); } }
            data-testid="product-decrease-quantity"
            type="button"
            disabled={ btnNegative }
          >
            -

          </button>
          <p data-testid="shopping-cart-product-quantity">
            {quantidade}

          </p>
          <button
            onClick={ () => { this.aumentar(); } }
            data-testid="product-increase-quantity"
            type="button"
            disabled={ btnDisabled }
          >
            +

          </button>

        </div>
        <div className="ItemCartDivPrice">
          <p>
            {`${price.toLocaleString(
              'pt-br',
              { style: 'currency', currency: 'BRL' },
            )}`}

          </p>
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
  calculaTotaldoCarrinho: propTypes.func.isRequired,
  // quantity: propTypes.number.isRequired,

};

export default ItemCart;
