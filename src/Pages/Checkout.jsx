import React from 'react';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    const product = localStorage.getItem('product');
    const productPARSE = JSON.parse(product);
    this.setState({ product: productPARSE });
  }

  render() {
    const { product } = this.state;
    return (
      <section>
        <div className="cart-products">
          <h3>Revise seus Produtos</h3>
          { product.map((ele) => <p key={ ele.id }>{ele.title}</p>) }
        </div>
        <div className="buyer-info">
          <h3>Informações do Comprador</h3>
          <form className="checkout-form">
            <label
              htmlFor="full-name"
              data-testid="checkout-fullname"
            >
              Nome Completo
              <input name="full-name" />
            </label>
            <label
              htmlFor="email"
              data-testid="checkout-email"
            >
              Email
              <input name="email" />
            </label>
            <label
              htmlFor="cpf"
              data-testid="checkout-cpf"
            >
              CPF
              <input name="cpf" />
            </label>
            <label
              htmlFor="phone"
              data-testid="checkout-phone"
            >
              Telefone
              <input name="phone" />
            </label>
            <label
              htmlFor="cep"
              data-testid="checkout-cep"
            >
              CEP
              <input name="cep" />
            </label>
            <label
              htmlFor="address"
              data-testid="checkout-address"
            >
              Endereço
              <input name="address" />
            </label>
          </form>
        </div>
        <div className="payment-metod">
          <h3>Método de Pagamento</h3>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="boleto"
              data-testid="ticket-payment"
            />
            Boleto
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="visa"
              data-testid="visa-payment"
            />
            Visa
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="mastercard"
              data-testid="master-payment"
            />
            MasterCard
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="elo"
              data-testid="elo-payment"
            />
            Elo
          </label>
        </div>
        <button
          type="button"
          data-testid="checkout-btn"
          disabled={ this.validCheckout }
          // onClick={}
        >
          Comprar
        </button>
      </section>
    );
  }
}

export default Checkout;
