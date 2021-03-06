import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import '../css/Feedback.css';

class Feedback extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const { placar } = this.props;
    console.log(assertions);
    const TRES = 3;
    return (
      <div>
        <Header />
        <div className="feedback-card">
          <h1 className="feedback">Feedback</h1>
          <div className="result-final">
            <h4 data-testid="feedback-text">
              { assertions >= TRES ? 'Mandou bem!' : 'Podia ser melhor...'}
            </h4>
            <h3 data-testid="feedback-total-score">
              {placar}
            </h3>
            <h3 data-testid="feedback-total-question">
              {assertions}
            </h3>
          </div>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              className="button-play-again"
              type="button"
            >
              Jogar novamente

            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              className="button-play-again"
              type="button"
            >
              Ver Ranking

            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  // assertions: PropTypes.number.isRequired,
  placar: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.timer.assertions,
  placar: state.timer.placar,

});

export default connect(mapStateToProps)(Feedback);
