import React from 'react';
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
    return (
      <div>
        <h1>Categorias:</h1>
        {categoriesList.map((categorie) => (
          <button
            key={ categorie.id }
            type="button"
            data-testid="category"
          >
            {categorie.name}

          </button>
        ))}
      </div>
    );
  }
}

export default Categories;
