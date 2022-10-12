import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createGravatarImage from '../services/getUserAvatar';
import '../css/feedback.css';

class Feedback extends React.Component {
  hitComparator = (hits) => {
    const minScore = 3;
    if (hits < minScore) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    return <p data-testid="feedback-text">Well Done!</p>;
  };

  render() {
    const { name, email, score, hits } = this.props;

    return (
      <main>
        <img
          src={ createGravatarImage(email) }
          alt={ `Avatar do usuario ${name}` }
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <section>
          { this.hitComparator(hits) }
        </section>
        <p data-testid="header-score">{score}</p>
      </main>
    );
  }
}

Feedback.defaultProps = {
  name: 'Player',
  score: 0,
  email: 'xablau@email.com',
  hits: 0,
};

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
  hits: PropTypes.number,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  hits: state.player.hits,
});

export default connect(mapStateToProps)(Feedback);
