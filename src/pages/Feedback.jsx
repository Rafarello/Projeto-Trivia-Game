import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';

class Feedback extends Component {
  render() {
    const { assertions, placar } = this.props;
    const TRES = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h4 data-testid="feedback-text">
          { assertions >= TRES ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h4>
        <h3 data-testid="feedback-total-score">
          {`Placar: ${placar}`}
        </h3>
        <h3 data-testid="feedback-total-question">
          {`Acertos: ${assertions}`}
        </h3>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  placar: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.timer.assertions,
  placar: state.timer.placar,

});

export default connect(mapStateToProps)(Feedback);
