import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { btnResposta } from '../redux/actions/index';
// Componente retirado da aula 13.1
class Cronometer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;

    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { desableBtn } = this.props;
    const { seconds } = this.state;
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.intervalID);
      desableBtn(seconds);
    }
  }

  componentWillUnmount() {
    const { seconds } = this.state;
    const { desableBtn } = this.props;
    clearInterval(this.intervalID);
    desableBtn(seconds);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1 className="timer">
        { seconds === 0 ? 'Tempo Esgotado' : seconds}
      </h1>
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
