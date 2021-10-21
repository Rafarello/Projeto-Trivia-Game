import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  saveToStore() {
    const { name, placar, email } = this.props;
    console.log(name);
    localStorage.setItem('state', { player: { name,
      gravatarEmail: email,
      score: placar,
      assertions: 0 } });
  }

  render() {
    this.saveToStore();
    const { name, placar, urlGravatar } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ urlGravatar } alt="Gravatar" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">{ placar }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  urlGravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
  placar: state.timer.placar,
  assertions: state.timer.assertions,
  urlGravatar: state.loginUser.urlGravatar,
});

export default connect(mapStateToProps)(Header);
