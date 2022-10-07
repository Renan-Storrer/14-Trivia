import React from 'react';

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
        <button type="button" data-testid="btn-play" disabled={ disableBtn }>
          Play
        </button>
      </div>
    );
  }
}

export default Login;
