import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Produto extends React.Component {
  render() {
    const { productName, productPrice, productImage, productId } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/produtoDetalhado/${productId}` } data-testid="product-detail-link">
          <p>{ productName }</p>
          <p>{ productPrice }</p>
          <img src={ productImage } alt={ productName } />
        </Link>
      </div>
    );
  }
}

Produto.propTypes = {
  productName: propTypes.string.isRequired,
  productPrice: propTypes.string.isRequired,
  productImage: propTypes.string.isRequired,
  productId: propTypes.string.isRequired,
};

export default Produto;
