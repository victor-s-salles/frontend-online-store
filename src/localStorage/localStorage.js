export function SalvaProduto(products) {
  localStorage.setItem('product', JSON.stringify(products));
}

export function recuperaProdutos() { return JSON.parse(localStorage.getItem('product')); }

export function filtraOsProdutos(productId, productLength) {
  localStorage.setItem(productId, productLength);
}

export function quantity(productId) { return localStorage.getItem(productId); }
// export default { SalvaProduto, recuperaProdutos };
