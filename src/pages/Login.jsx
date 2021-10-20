import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import requestToken from '../services/requestAPITrivia';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickRequstToken = this.handleClickRequstToken.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClickRequstToken() {
    const { history } = this.props;
    const tokenAPI = await requestToken();
    localStorage.setItem('token', tokenAPI.token);
    history.push('/tela-de-jogo');
  }

  render() {
    const { inputName, inputEmail } = this.state;
    return (
      <div>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
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
          onClick={ this.handleClickRequstToken }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
