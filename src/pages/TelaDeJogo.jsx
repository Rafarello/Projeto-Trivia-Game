import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import Timer from '../componets/Timer';
import { somaPlacar } from '../redux/actions/index';

import { requestQuestions } from '../services/requestAPITrivia';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      indice: 0,
      btnStyleIncorrect: {},
      btnStyleCorrect: {},
      isTimer: true,
      btnProxima: false,
    };
    this.requestQuestionsApi = this.requestQuestionsApi.bind(this);
    this.alteraCorBtn = this.alteraCorBtn.bind(this);
  }

  componentDidMount() {
    this.requestQuestionsApi();
  }

  async requestQuestionsApi() {
    const questions = await requestQuestions();
    this.setState({ questions: questions.results });
  }

  alteraCorBtn(difficulty) {
    const DEZ = 10;
    const TRES = 3;
    this.setState({ btnStyleIncorrect: { border: '3px solid rgb(255, 0, 0) ' },
      btnStyleCorrect: { border: '3px solid rgb(6, 240, 15)' },
      isTimer: false,
      btnProxima: true });

    const { disableBtn, somaPlacarAction } = this.props;
    switch (difficulty) {
    case 'easy':
      return somaPlacarAction(DEZ + (1 * +disableBtn));
    case 'medium':
      return somaPlacarAction(DEZ + (2 * +disableBtn));
    case 'hard':
      return somaPlacarAction(DEZ + (TRES * +disableBtn));
    case 'error':
      return 0;
    default:
      return disableBtn;
    }
  }

  saveToStore() {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    console.log(getStorage);
    const { name, placar, email, assertions } = this.props;
    const player = { name,
      gravatarEmail: email,
      score: placar,
      assertions };
    const newArray = !getStorage ? [player] : [...getStorage, player];
    localStorage.setItem('state', JSON.stringify(newArray));
  }

  // Função para embaralhar Array retirado do site: https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
  renderQuestions(array) {
    const { disableBtn } = this.props;
    const btnBoolean = disableBtn === 0;
    const { btnStyleIncorrect, btnStyleCorrect, isTimer } = this.state;
    return array.map((question, idx) => {
      const arrayAnswerIncorrect = question.incorrect_answers.map((e, idxx) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${idxx}` }
          key={ idxx }
          style={ btnStyleIncorrect }
          onClick={ () => this.alteraCorBtn('error') }
          disabled={ btnBoolean }
        >
          { e }
        </button>
      ));
      const answerCorrect = (
        <button
          type="button"
          data-testid="correct-answer"
          key="4"
          onClick={ () => this.alteraCorBtn(question.difficulty) }
          style={ btnStyleCorrect }
          disabled={ btnBoolean }
        >
          { question.correct_answer }
        </button>);
      const MEIO = 0.5;
      const allAnswers = [...arrayAnswerIncorrect, answerCorrect];
      const shuffledArr = allAnswers.sort(() => MEIO - Math.random());
      return (
        <div key={ idx }>
          <h5 data-testid="question-category">
            {`Categoria: ${question.category}`}
          </h5>
          <h3 data-testid="question-text">
            {`Pergunta: ${question.question}`}
          </h3>
          <div data-testid="question-text">
            { shuffledArr.map((e) => (e))}
          </div>
          { isTimer ? <Timer /> : 'Tempo Esgotado' }
        </div>
      );
    });
  }

  renderFinalJogo() {
    this.saveToStore();
    return (
      <div>
        <h3>Final de Jogo</h3>
        <Link to="/"><button type="button">Menu Login</button></Link>
      </div>

    );
  }

  renderButtonProxima() {
    const { indice } = this.state;

    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState({ indice: indice + 1,
            btnStyleIncorrect: {},
            btnStyleCorrect: {} });
        } }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { questions, indice, btnProxima } = this.state;
    const renderQuestions = !questions ? 'Carregado...'
      : this.renderQuestions(questions)[indice];
    if (questions && indice === questions.length) { return this.renderFinalJogo(); }
    return (
      <div>
        <Header />
        <h2>Tela de Jogo</h2>
        {renderQuestions}
        { !btnProxima ? ''
          : this.renderButtonProxima()}

      </div>
    );
  }
}

TelaDeJogo.propTypes = {
  assertions: PropTypes.number.isRequired,
  disableBtn: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  somaPlacarAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disableBtn: state.timer.btnResposta,
  placar: state.timer.placar,
  name: state.loginUser.name,
  email: state.loginUser.email,
  assertions: state.timer.assertions,
  urlGravatar: state.loginUser.urlGravatar,
});

const mapDispatchToProps = (dispatch) => ({
  somaPlacarAction: (e) => dispatch(somaPlacar(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeJogo);
