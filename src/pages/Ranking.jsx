import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
        data-testid="btn-go-home"
      >
        Voltar ao Início
      </button>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
