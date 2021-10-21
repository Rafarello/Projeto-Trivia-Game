import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { btnResposta } from '../redux/actions/index';
// Componente retirado da aula 13.1
class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 5,
    };
    this.timeLimit = this.timeLimit.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;

    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  timeLimit() {
    const { desableBtn } = this.props;
    clearInterval(this.intervalID);
    desableBtn(true);
    return 'Tempo Esgotado!';
  }

  render() {
    const TIME_LIMIT = 0;
    const { seconds } = this.state;
    return (
      <h2>
        { seconds > TIME_LIMIT ? seconds : this.timeLimit() }
      </h2>
    );
  }
}

Cronometer.propTypes = {
  desableBtn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  desableBtn: (e) => dispatch(btnResposta(e)),
});

export default connect(null, mapDispatchToProps)(Cronometer);
