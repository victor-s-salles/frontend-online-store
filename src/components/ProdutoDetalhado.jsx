import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProdutoDetalhado extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produtoDetalhado = await getProductById(id);
    console.log(produtoDetalhado);
    this.setState({ product: [produtoDetalhado], loading: false });
  }

  render() {
    const { product, loading } = this.state;
    return (
      <div>
        {loading ? <p>Carregando...</p>
          : product.map((element, index) => (
            <div key={ index }>
              <p data-testid="product-detail-name">{ element.title }</p>
              <p data-testid="product-detail-price">{ element.price }</p>
              <img
                src={ element.thumbnail }
                alt={ element.title }
                data-testid="product-detail-image"
              />
            </div>
          ))}
        <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>
      </div>
    );
  }
}

ProdutoDetalhado.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProdutoDetalhado;
