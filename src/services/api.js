export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categoriesApi = response.json();
  return categoriesApi;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (!query) {
    const urlCategory = ` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const response = await fetch(urlCategory);
    const pesquisaCat = response.json();
    return pesquisaCat;
  }
  if (!categoryId) {
    const urlDigitado = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(urlDigitado);
    const pesquisaDig = response.json();
    return pesquisaDig;
  }
  if (categoryId && query) {
    const urlSame = ` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
    const response = await fetch(urlSame);
    const pesquisaWithSame = response.json();
    return pesquisaWithSame;
  }
}

export async function getProductById(productId) {
  const urlId = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(urlId);
  const pesquisaProductId = response.json();
  return pesquisaProductId;
}
