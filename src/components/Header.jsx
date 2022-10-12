import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import md5 from 'crypto-js/md5';
import createGravatarImage from '../services/getUserAvatar';

class Header extends React.Component {
  // createGravatarImage = () => {
  //   const { email } = this.props;
  //   const hashGerada = md5(email).toString();
  //   return `https://www.gravatar.com/avatar/${hashGerada}`;
  // };

  render() {
    const { nome, score, email } = this.props;
    return (
      <header>
        <img
          src={ createGravatarImage(email) }
          alt={ nome }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
