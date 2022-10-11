import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';
import {
  SalvaProduto,
  recuperaProdutos } from '../localStorage/localStorage';

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

    const idQuantidade = `quantidade:${product[0].id}`;
    this.salvarQuantidade(idQuantidade);

    // console.log(product[0].thumbnail_id);
    // this.salvarQuantidade(product[0].thumbnail_id);

    const produto = product;
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      const [produtoObj] = produto;
      produtos.push(produtoObj);
      this.setState({
        produtosSalvos: produtos,
      }, () => {
        const { produtosSalvos } = this.state;
        console.log(produtosSalvos);
        SalvaProduto(produtosSalvos);
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

  salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) {
      antes = 0;
    }
    // const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, 1);
    //---------------------
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
