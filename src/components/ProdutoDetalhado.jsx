import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';
import {
  SalvaProduto,
  recuperaProdutos,
  filtraOsProdutos } from '../localStorage/localStorage';

class ProdutoDetalhado extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      loading: true,
      produtosSalvos: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produtoDetalhado = await getProductById(id);
    this.setState({ product: [produtoDetalhado], loading: false });
  }

  onClickButton = () => {
    const { product } = this.state;
    const produto = product;
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      const [produtoObj] = produto;
      produtos.unshift(produtoObj);
      this.setState({
        produtosSalvos: produtos,
      }, () => {
        const { produtosSalvos } = this.state;
        console.log(produtosSalvos);
        SalvaProduto(produtosSalvos);
        const productlength = produtosSalvos
          .filter((ele) => ele.id === produtosSalvos[0].id).length;
        filtraOsProdutos(produtosSalvos[0].id, productlength);
      });
    } else {
      this.setState({
        produtosSalvos: produto,
      }, () => {
        const { produtosSalvos } = this.state;
        SalvaProduto(produtosSalvos);
      });
    }
  };

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
              <button
                name="Add Cart"
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.onClickButton }
              >
                Add Cart
              </button>
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
