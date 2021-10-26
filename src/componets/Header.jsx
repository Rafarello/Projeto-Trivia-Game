import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillTrophy } from 'react-icons/ai';

class Header extends Component {
  getScore() {
    localStorage.getItem();
  }

  render() {
    const { name, placar, urlGravatar } = this.props;
    return (
      <header className="header">
        <img
          className="avatar"
          data-testid="header-profile-picture"
          src={ urlGravatar }
          alt="Gravatar"
        />

        <div className="top-bar">
          <div className="name-score">
            <h3 className="title" data-testid="header-player-name">{ name }</h3>
            <h3 className="title" data-testid="header-score">{ placar }</h3>
          </div>

          <Link to="/ranking">
            <button
              type="button"
              className="btn-rankig"
            >
              <div className="ranking">Ranking</div>
              <AiFillTrophy className="trofeu" />
            </button>
          </Link>
        </div>
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
  placar: state.timer.placar,
  urlGravatar: state.loginUser.urlGravatar,
});

export default connect(mapStateToProps)(Header);
