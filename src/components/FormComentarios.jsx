import React from 'react';
import PropTypes from 'prop-types';
import Avaliacao from './Avaliacao';

class FormComentarios extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      textarea: '',
      ratingValue: 0,
      productId: '',
      invalidInput: false,
      arrayOfComments: [],
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    const comments = localStorage.getItem(productId);
    const commentsPARSE = JSON.parse(comments);
    this.setState({ arrayOfComments: commentsPARSE, productId });
  }

  cleanInputs = () => {
    this.setState(({
      email: '',
      textarea: '',
      ratingValue: 0,
      invalidInput: false,
    }));
  };

  saveOnLocalStorage = () => {
    this.cleanInputs();
    const { email, ratingValue, textarea, productId } = this.state;
    const comment = { email, textarea, ratingValue };
    const oldComments = localStorage.getItem(productId);
    if (oldComments) {
      const oldCommentsPARSE = JSON.parse(oldComments);
      oldCommentsPARSE.push(comment);
      const commentJSON = JSON.stringify(oldCommentsPARSE);
      localStorage.setItem(productId, [commentJSON]);
      this.setState((prev) => ({ arrayOfComments: [...prev.arrayOfComments, comment] }));
    } else {
      const array = [{ email, textarea, ratingValue }];
      const comentJSON = JSON.stringify(array);
      localStorage.setItem(productId, [comentJSON]);
      this.setState({ arrayOfComments: [comment] });
    }
  };

  validateInputs = () => {
    const { email, ratingValue } = this.state;
    const emailCheck = email.includes('@') && email.includes('.com');
    const ratingCheck = ratingValue > 0;
    if (!emailCheck || !ratingCheck) {
      this.setState({ invalidInput: true });
    } else {
      this.saveOnLocalStorage();
      this.setState({ invalidInput: false });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  saveRating = ({ target }) => {
    this.setState({ ratingValue: target.id });
  };

  render() {
    const { email, ratingValue, textarea, invalidInput, arrayOfComments } = this.state;
    return (
      <section>
        <form>
          {invalidInput && <p data-testid="error-msg">Campos inválidos</p>}
          <label htmlFor="email-input">
            E-mail
            <input
              id="email-input"
              name="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Avaliacao ratingValue={ ratingValue } saveRating={ this.saveRating } />
          <textarea
            name="textarea"
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
            value={ textarea }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validateInputs }
          >
            Avaliar
          </button>
        </form>
        <div className="comments">
          { arrayOfComments
          && arrayOfComments.map((ele, i) => (
            <div className="comment" key={ i }>
              <p data-testid="review-card-email">{ ele.email }</p>
              <Avaliacao ratingValue={ ele.ratingValue } />
              <p data-testid="review-card-evaluation">{ ele.textarea }</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

FormComentarios.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default FormComentarios;
