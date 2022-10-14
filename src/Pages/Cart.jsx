import React from 'react';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCart from '../components/ItemCart';
import { recuperaProdutos } from '../localStorage/localStorage';
import arroyBack from '../CSS/images/icon _arrow back_.png';
import logo from '../CSS/images/logo.png';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false, cartArray: [], cartArrayFiltred: [], total: 0 };
  }

  componentDidMount() {
    this.validadeItens();
    this.calculaTotaldoCarrinho();
  }

  validadeItens = () => {
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      this.setState({ temAlgo: true, cartArray: produtos }, this.removeDuplicates);
    }
  };

  decreaseItem = (productID) => {
    let quantidade = localStorage.getItem(productID);
    quantidade = parseInt(quantidade, 10) - 1;
    if (!quantidade < 1) {
      localStorage.setItem(productID, quantidade);
      this.forceUpdate();

      // this.setState({ teste: true });
    }
  };

  increaseItem = (productID) => {
    let quantidade = localStorage.getItem(productID);
    quantidade = parseInt(quantidade, 10) + 1;
    localStorage.setItem(productID, quantidade);
    this.forceUpdate();
  };

  removeItem = (productID) => {
    // const productID = `quantidade:${id}`;
    localStorage.removeItem(`quantidade:${productID}`);
    const listaDeItens = JSON.parse(localStorage.getItem('productFiltred'));
    const itemRemoved = listaDeItens.find((item) => (item.id === productID));
    const index = listaDeItens.indexOf(itemRemoved);
    listaDeItens.splice(index, 1);

    localStorage.setItem('productFiltred', JSON.stringify(listaDeItens));
    localStorage.setItem('product', JSON.stringify(listaDeItens));
    this.setState({
      cartArrayFiltred: listaDeItens,
    }, this.calculaTotaldoCarrinho);
    this.forceUpdate();
    // this.setState({ teste: true });
  };

  calcula = (productThumbnailId) => {
    const quantidade = localStorage.getItem(productThumbnailId);
    return quantidade;
  };

  calculaTotaldoCarrinho = () => {
    const { cartArrayFiltred } = this.state;
    setTimeout(() => {
      if (cartArrayFiltred.length !== 0) {
        const soma = cartArrayFiltred.reduce((acc, item) => {
          const quantidade = localStorage.getItem(`quantidade:${item.id}`);
          const sum = Number(quantidade) * item.price;
          acc += sum;
          return acc;
        }, 0);

        this.setState({ total: soma });
      }
    }, 100);
    if (cartArrayFiltred.length === 0) {
      this.setState({ total: 0 });
    }
  };

  removeDuplicates = () => {
    const { cartArray } = this.state;

    const setArray = new Set();
    const filtredArray = cartArray.filter((item) => {
      const duplicatedItem = setArray.has(item.id);
      setArray.add(item.id);
      return !duplicatedItem;
    });
    this.setState({
      cartArrayFiltred: filtredArray,
    }, this.calculaTotaldoCarrinho);
    localStorage.setItem('productFiltred', JSON.stringify(filtredArray));
    localStorage.setItem('product', JSON.stringify(filtredArray));
  };

  render() {
    const { temAlgo, cartArrayFiltred, total } = this.state;
    return (
      <div>
        <header className="Cart-Header"><img src={ logo } alt="" /></header>
        <Link
          to="/"
          className="CartLinkBack"
        >
          <img src={ arroyBack } alt="" />
          <h4>Voltar</h4>
        </Link>
        <div className="CartSecondaryDiv">
          {!temAlgo && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <div className="Cart-CartItensDiv">
            <h1 className="Cart-Title">Carrinho de Compras</h1>
            {temAlgo
          && cartArrayFiltred.map((item, index) => (
            <ItemCart
              calculaTotaldoCarrinho={ this.calculaTotaldoCarrinho }
              decreaseItem={ this.decreaseItem }
              increaseItem={ this.increaseItem }
              removeItem={ this.removeItem }
              quantity={ this.calcula(item.thumbnail_id) }
              key={ index }
              cartItensArray={ item }
            />
          ))}

          </div>

          <div className="CartTotalDiv">
            <div className="CartSomaTotal">
              <h1>Valor total da compra:</h1>
              <h3>
                {total.toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}

              </h3>
            </div>
            <Link to="/checkout" data-testid="checkout-products">
              <button className="CartFinishBtn" type="button">Finalizar Compra</button>

            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// Cart.propTypes = {
//   cartItensArray: propTypes.arrayOf.isRequired,
// };

export default Cart;
