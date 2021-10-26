import React, { Component } from 'react';
import { IoMdSettings } from 'react-icons/io';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/trivia.png';
import requestToken from '../services/requestAPITrivia';
import { loginUser } from '../redux/actions/index';
import '../css/Login.css';

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
    const { inputName, inputEmail } = this.state;
    const { history, loginUserAction } = this.props;
    const tokenAPI = await requestToken();
    localStorage.setItem('token', tokenAPI.token);
    loginUserAction({ inputName, inputEmail });
    history.push('/tela-de-jogo');
  }

  // a div da linha 37 era um button com o calor "Configurações"
  render() {
    const { inputName, inputEmail } = this.state;
    return (
      <div className="login-card">
        <div className="top-login">
          <div className="tapaburaco" />
          <img src={ logo } alt="Trivia" className="logo" />
          <Link to="/settings" title="Configurações" className="settings">
            <span className="settings"><IoMdSettings /></span>
          </Link>
        </div>
        <label htmlFor="inputName" className="label">
          Nome:
          <input
            id="inputName"
            data-testid="input-player-name"
            type="text"
            name="inputName"
            onChange={ this.handleChange }
            value={ inputName }
            placeholder="Escreva Seu nome"
            className="name-login"
          />
        </label>
        <label htmlFor="inputEmail" className="label">
          Email:
          <input
            id="inputEmail"
            data-testid="input-gravatar-email"
            type="text"
            name="inputEmail"
            onChange={ this.handleChange }
            value={ inputEmail }
            placeholder="Escreva Seu email"
            className="email-login"
          />
        </label>
        <button
          disabled={ !(inputEmail.length > 0 && inputName.length > 0) }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClickRequstToken }
          className="button-login"
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
  loginUserAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (e) => dispatch(loginUser(e)),
});

export default connect(null, mapDispatchToProps)(Login);
