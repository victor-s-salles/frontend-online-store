import React from 'react';
import propTypes from 'prop-types';

class Produto extends React.Component {
  render() {
    const { productName, productPrice, productImage } = this.props;
    return (
      <div data-testid="product">
        <p>{ productName }</p>
        <p>{ productPrice }</p>
        <img src={ productImage } alt={ productName } />

      </div>
    );
  }
}

Produto.propTypes = {
  productName: propTypes.string.isRequired,
  productPrice: propTypes.string.isRequired,
  productImage: propTypes.string.isRequired,
};

export default Produto;
