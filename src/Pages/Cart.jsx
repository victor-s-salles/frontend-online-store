import React from 'react';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCart from '../components/ItemCart';
import { recuperaProdutos } from '../localStorage/localStorage';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false, cartArray: [], cartArrayFiltred: [] };
  }

  componentDidMount() {
    this.validadeItens();
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
    // this.setState({ teste: false });
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
    });
    this.forceUpdate();
    // this.setState({ teste: true });
  };

  calcula = (productThumbnailId) => {
    const quantidade = localStorage.getItem(productThumbnailId);
    return quantidade;
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
    });
    localStorage.setItem('productFiltred', JSON.stringify(filtredArray));
    localStorage.setItem('product', JSON.stringify(filtredArray));
  };

  render() {
    const { temAlgo, cartArrayFiltred } = this.state;
    return (
      <div>
        {!temAlgo && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {temAlgo
          && cartArrayFiltred.map((item, index) => (
            <ItemCart
              decreaseItem={ this.decreaseItem }
              increaseItem={ this.increaseItem }
              removeItem={ this.removeItem }
              quantity={ this.calcula(item.thumbnail_id) }
              key={ index }
              cartItensArray={ item }
            />
          ))}
        <Link to="/checkout" data-testid="checkout-products">Checkout</Link>
      </div>
    );
  }
}

// Cart.propTypes = {
//   cartItensArray: propTypes.arrayOf.isRequired,
// };

export default Cart;
