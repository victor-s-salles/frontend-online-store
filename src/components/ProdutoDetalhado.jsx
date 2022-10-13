import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';
import FormComentarios from './FormComentarios';
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
      id: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produtoDetalhado = await getProductById(id);
    this.setState({ product: [produtoDetalhado], loading: false, id });
    this.calculaTotal();
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
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
    //---------------------
    this.calculaTotal();
  };

  calculaTotal = () => {
    const listaDeItens = JSON.parse(localStorage.getItem('product'));

    if (listaDeItens != null) {
      const setArray = new Set();
      const filtredArray = listaDeItens.filter((item) => {
        const duplicatedItem = setArray.has(item.id);
        setArray.add(item.id);
        return !duplicatedItem;
      });
      const ids = filtredArray.map((item) => item.id);
      const soma = ids.reduce((acc, numero) => {
        const quantidade = localStorage.getItem(`quantidade:${numero}`);
        acc += Number(quantidade);
        return acc;
      }, 0);
      this.setState({ quantidadeCarrinho: soma });
    }
  };

  render() {
    const { product, loading, id, quantidadeCarrinho } = this.state;
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
              <div>
                {element.shipping.free_shipping
              && <h4 data-testid="free-shipping">Frete Grátis</h4>}

              </div>
              <button
                name="Add Cart"
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.onClickButton }
              >
                Add Cart
              </button>
              <FormComentarios productId={ id } />
            </div>
          ))}
        <Link to="/cart" data-testid="shopping-cart-button">
          <div>
            <p>Cart</p>
            <p data-testid="shopping-cart-size">{quantidadeCarrinho}</p>
          </div>
        </Link>
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
