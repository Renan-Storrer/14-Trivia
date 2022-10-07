import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestApi from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disableBtn: true,
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.verifyBtn();
    });
  };

  handleClick = async () => {
    const { returnToken, history } = this.props;
    await returnToken();
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { disableBtn } = this.state;
    return (
      <div>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disableBtn }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  returnToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  returnToken: () => dispatch(requestApi()),
});

const mapStateToProps = (state) => ({
  token: state.gameReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
