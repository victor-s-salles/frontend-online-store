import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CgSearch } from 'react-icons/cg';
import Produto from '../components/Produto';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';

class Principal extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
      valor: false,
      resultadoDaBusca: {},
      quantidadeCarrinho: 0,
    };
  }

  componentDidMount() {
    this.calculaTotal();
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { campoDeBusca } = this.state;
    const categories = await getProductsFromCategoryAndQuery(false, campoDeBusca);
    if (!categories) {
      this.setState({
        valor: false,
      });
    } else {
      this.setState({
        valor: true,
        resultadoDaBusca: categories,
      });
    }
  };

  getCategorieProducts = async ({ target }) => {
    const response = await getProductsFromCategoryAndQuery(target.id);
    const { results } = response;
    this.setState({
      valor: true,
      resultadoDaBusca: { results },
    });
  };

  salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) {
      antes = 0;
    }
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
    //-------------------
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
    const { campoDeBusca, valor, resultadoDaBusca, quantidadeCarrinho } = this.state;
    return (
      <div>
        <div className="principalHeader">
          <div className="principalPesquisa">
            <input
              value={ campoDeBusca }
              onChange={ this.onChange }
              name="campoDeBusca"
              type="text"
              data-testid="query-input"
            />
            <label htmlFor="principalButton">
              <CgSearch className="principalLupa" />
              <button
                id="principalButton"
                type="button"
                data-testid="query-button"
                onClick={ this.handleClick }
              >
                button
              </button>
            </label>
          </div>
          <div className="principalDivCarrinho">
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
              className="principalLinkCart"
            >
              <FaShoppingCart className="principalCart" />
              <p data-testid="shopping-cart-size">{quantidadeCarrinho}</p>
            </Link>
          </div>
        </div>
        <div className="principalMain">

          <Categories
            getProducts={ this.getCategorieProducts }
            className="principalCategories"
          />
          <div className="principalResultado">
            <h3
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.

            </h3>
            <div className="principalProdutos">

              {valor ? resultadoDaBusca.results.map((ele) => (
                <Produto
                  // getCartItens={ this.getCartItens }
                  objItem={ ele }
                  key={ ele.title }
                  productName={ ele.title }
                  productPrice={ ele.price }
                  productImage={ ele.thumbnail }
                  productId={ ele.id }
                  freeShipping={ ele.shipping.free_shipping }
                  salvarQuantidade={ this.salvarQuantidade }
                />)) : <p>Nenhum produto foi encontrado</p> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Principal;
