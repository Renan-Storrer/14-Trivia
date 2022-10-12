import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createGravatarImage from '../services/getUserAvatar';
import Header from '../components/Header';
import '../css/feedback.css';

class Feedback extends React.Component {
  hitComparator = (assertions) => {
    const minScore = 3;
    if (assertions < minScore) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    return <p data-testid="feedback-text">Well Done!</p>;
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
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
