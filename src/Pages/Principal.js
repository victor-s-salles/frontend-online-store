import React from 'react';
import Categories from '../components/Categories';

class Principal extends React.Component {
  render() {
    return (
      <div>
        <Categories />
        <input type="text" />
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h3>

      </div>
    );
  }
}

export default Principal;
