import React from 'react';
import PropTypes from 'prop-types';

class Avaliacao extends React.Component {
  constructor() {
    super();

    this.state = {
      array: ['1', '2', '3', '4', '5'],
    };
  }

  render() {
    const { array } = this.state;
    const { saveRating, ratingValue } = this.props;
    return (
      <div>
        { saveRating
          ? (
            array.map((ele, index) => (
              <input
                id={ ele }
                key={ ele }
                type="checkbox"
                data-testid={ `${index + 1}-rating` }
                checked={ ratingValue >= ele }
                onChange={ saveRating }
              />
            ))
          )
          : (
            <div data-testid="review-card-rating">
              {array.map((ele) => (
                <input
                  id={ ele }
                  key={ ele }
                  type="checkbox"
                  checked={ ratingValue >= ele }
                  disabled
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Avaliacao.defaultProps = {
  saveRating: false,
};

Avaliacao.propTypes = {
  saveRating: PropTypes.func,
  ratingValue: PropTypes.number.isRequired,
};

export default Avaliacao;
