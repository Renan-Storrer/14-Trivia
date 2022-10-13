import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createGravatarImage from '../services/getUserAvatar';
import Header from '../components/Header';
// import '../css/feedback.css';

class Feedback extends React.Component {
  hitComparator = (assertions) => {
    const minScore = 3;
    if (assertions < minScore) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    return <p data-testid="feedback-text">Well Done!</p>;
  };

  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRancking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { name, email, score, assertions } = this.props;

    return (
      <>
        <Header />
        <main>
          <img
            src={ createGravatarImage(email) }
            alt={ `Avatar do usuario ${name}` }
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">{name}</h1>
          <section>
            { this.hitComparator(assertions) }
          </section>
          {/* <p data-testid="header-score">{score}</p> */}
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClickPlayAgain }
          >
            Play Again
          </button>
          <br />
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleClickRancking }
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

Feedback.defaultProps = {
  name: 'Player',
  score: 0,
  email: 'xablau@email.com',
  assertions: 0,
};

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
  assertions: PropTypes.number,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
