import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/feedback.css';

class Feedback extends React.Component {
  hitComparator = (score) => {
    const minScore = 3;
    if (score < minScore) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    return <p data-testid="feedback-text">Well Done!</p>;
  };

  render() {
    const { name, score } = this.props;

    return (
      <main>
        <h1>{name}</h1>
        <section>
          { this.hitComparator(score) }
        </section>
      </main>
    );
  }
}

Feedback.defaultProps = {
  name: 'Player',
  score: 0,
};

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
