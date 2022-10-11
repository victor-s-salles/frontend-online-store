import React from 'react';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCart from '../components/ItemCart';
import { recuperaProdutos } from '../localStorage/localStorage';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false, cartArray: [] };
  }

  componentDidMount() {
    this.validadeItens();
  }

  validadeItens = () => {
    // const { cartItensArray } = this.props;
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      // const filtro = produtos.filter((ele) => ele.title);
      this.setState({ temAlgo: true, cartArray: produtos });
    }
  };

  render() {
    // const { cartItensArray } = this.props;
    const { temAlgo, cartArray } = this.state;
    return (
      <div>
        {!temAlgo && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {temAlgo
          && cartArray.map((item, index) => (
            <ItemCart key={ index } cartItensArray={ item } />
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
