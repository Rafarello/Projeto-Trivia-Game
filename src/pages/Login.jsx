import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputName, inputEmail } = this.state;
    return (
      <div>
        <label htmlFor="inputName">
          Nome:
          <input
            id="inputName"
            data-testid="input-player-name"
            type="text"
            name="inputName"
            onChange={ this.handleChange }
            value={ inputName }
          />
        </label>
        <label htmlFor="inputEmail">
          Email:
          <input
            id="inputEmail"
            data-testid="input-gravatar-email"
            type="text"
            name="inputEmail"
            onChange={ this.handleChange }
            value={ inputEmail }
          />
        </label>
        <button
          disabled={ !(inputEmail.length > 0 && inputName.length > 0) }
          type="button"
          data-testid="btn-play"
        >
          Jogar

        </button>
      </div>
    );
  }
}

export default Login;
