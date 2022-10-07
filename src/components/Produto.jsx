import React from 'react';
import propTypes from 'prop-types';

class Produto extends React.Component {
  render() {
    const { productName, productPrice, productImage,
      getCartItens, objItem } = this.props;
    return (
      <div data-testid="product">
        <p>{ productName }</p>
        <p>{ productPrice }</p>
        <img src={ productImage } alt={ productName } />
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => getCartItens(objItem) }
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

Produto.propTypes = {
  productName: propTypes.string.isRequired,
  productPrice: propTypes.string.isRequired,
  productImage: propTypes.string.isRequired,
  getCartItens: propTypes.func.isRequired,
  objItem: propTypes.shape({
    title: propTypes.string,
    price: propTypes.string,
    thumbnail: propTypes.string,
  }).isRequired,
};

export default Produto;
