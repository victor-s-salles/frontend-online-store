import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      valid: false,
      product: [],
      fullname: '',
      email: '',
      address: '',
      cpf: '',
      cep: '',
      phone: '',
      payment: '',
    };
  }

  componentDidMount() {
    const product = localStorage.getItem('product');
    const productPARSE = JSON.parse(product);
    this.setState({ product: productPARSE });
  }

  validateInputs = () => {
    const { fullname, address, cep, cpf, phone, email, payment } = this.state;
    const valid = !!(fullname && address && cep && cpf && phone && email && payment);
    if (!valid) {
      this.setState({ valid: true });
    } else {
      this.finishOrder();
      this.setState({ valid: false });
    }
  };

  finishOrder = () => {
    const { history } = this.props;
    localStorage.removeItem('product');
    localStorage.removeItem('productFiltred');
    history.push('/');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { product, fullname, address, cep, cpf, phone, email, valid } = this.state;
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
              htmlFor="fullname"
            >
              Nome Completo
              <input
                name="fullname"
                data-testid="checkout-fullname"
                value={ fullname }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="email"
            >
              Email
              <input
                name="email"
                data-testid="checkout-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="cpf"
            >
              CPF
              <input
                name="cpf"
                value={ cpf }
                data-testid="checkout-cpf"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="phone"
            >
              Telefone
              <input
                name="phone"
                data-testid="checkout-phone"
                value={ phone }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="cep"
            >
              CEP
              <input
                name="cep"
                data-testid="checkout-cep"
                value={ cep }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="address"
            >
              Endereço
              <input
                name="address"
                data-testid="checkout-address"
                value={ address }
                onChange={ this.handleChange }
              />
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
              onClick={ this.handleChange }
              data-testid="ticket-payment"
            />
            Boleto
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="visa"
              onClick={ this.handleChange }
              data-testid="visa-payment"
            />
            Visa
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="mastercard"
              onClick={ this.handleChange }
              data-testid="master-payment"
            />
            MasterCard
          </label>
          <label htmlFor="payment">
            <input
              type="radio"
              name="payment"
              id="elo"
              onClick={ this.handleChange }
              data-testid="elo-payment"
            />
            Elo
          </label>
        </div>
        { valid && <p data-testid="error-msg">Campos inválidos</p> }
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.validateInputs }
        >
          Comprar
        </button>
      </section>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
