import React from 'react';
import Produto from '../components/Produto';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';

class Principal extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
      valor: false,
      resultadoDaBusca: {},
    };
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    console.log(value);
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
      console.log(categories.results);
    }
  };

  render() {
    const { campoDeBusca, valor, resultadoDaBusca } = this.state;
    // const { results } = resultadoDaBusca;
    return (
      <div>
        <div>
          <input
            value={ campoDeBusca }
            onChange={ this.onChange }
            name="campoDeBusca"
            type="text"
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        <Categories />
        <input type="text" />
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h3>
        {valor ? resultadoDaBusca.results.map((ele, index) => (
          <Produto
            key={ index }
            productName={ ele.title }
            productPrice={ ele.price }
            productImage={ ele.thumbnail }
          />)) : <p>Nenhum produto foi encontrado</p> }
        <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>
      </div>
    );
  }
}

export default Principal;
