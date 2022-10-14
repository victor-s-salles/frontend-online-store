import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.getListCategories();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  };

  render() {
    const { categoriesList } = this.state;
    const { getProducts } = this.props;
    return (
      <div className="categories">
        <h1>Categorias:</h1>
        {categoriesList.map((categorie) => (
          <button
            className="categorieButton"
            key={ categorie.id }
            id={ categorie.id }
            type="button"
            data-testid="category"
            onClick={ getProducts }
          >
            {categorie.name}

          </button>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default Categories;
