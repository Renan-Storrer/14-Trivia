import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {
    placar: 0,
  };

  createGravatarImage = () => {
    const { email } = this.props;
    const hashGerada = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hashGerada}`;
  };

  render() {
    const { nome } = this.props;
    const { placar } = this.state;
    return (
      <header>
        <img
          src={ this.createGravatarImage() }
          alt={ nome }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ placar }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
