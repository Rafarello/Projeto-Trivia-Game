import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../componets/Header';
import Timer from '../componets/Timer';
import { somaPlacar } from '../redux/actions/index';

import './TelaDeJogo.css';

import { requestQuestions } from '../services/requestAPITrivia';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      indice: 0,
      btnProxima: false,
    };
    this.requestQuestionsApi = this.requestQuestionsApi.bind(this);
    this.alteraCorBtn = this.alteraCorBtn.bind(this);
  }

  componentDidMount() {
    this.requestQuestionsApi();
    this.saveToStore();
  }

  async requestQuestionsApi() {
    const questions = await requestQuestions();
    this.setState({ questions: questions.results });
  }

  alteraCorBtn(difficulty) {
    const DEZ = 10;
    const TRES = 3;
    this.setState({ btnBoolean: true,
      btnProxima: true });

    const { disableBtn } = this.props;
    switch (difficulty) {
    case 'easy':
      return (
        this.alteraScoreLocalStorage(DEZ + (1 * +disableBtn))
      );
    case 'medium':
      return this.alteraScoreLocalStorage(DEZ + (2 * +disableBtn));
    case 'hard':
      return this.alteraScoreLocalStorage(DEZ + (TRES * +disableBtn));
    case 'error':
      return 0;
    default:
      return disableBtn;
    }
  }

  alteraScoreLocalStorage(score) {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    console.log(getStorage);

    const { name, email, assertions, somaPlacarAction } = this.props;
    const player = { player: {
      name,
      gravatarEmail: email,
      score,
      assertions,
    } };
    localStorage.setItem('state', JSON.stringify(player));
    somaPlacarAction(score);
  }

  saveToStore() {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    console.log(getStorage);
    const { name, placar, email, assertions } = this.props;
    const player = { player: {
      name,
      gravatarEmail: email,
      score: placar,
      assertions,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  // Função para embaralhar Array retirado do site: https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
  renderQuestions(array) {
    const { disableBtn } = this.props;
    const { btnBoolean } = this.state;
    const btnBool = disableBtn === 0 || btnBoolean;
    return array.map((question, idx) => {
      const arrayAnswerIncorrect = question.incorrect_answers.map((e, idxx) => (
        <button
          className="incorrectResponse"
          type="button"
          data-testid={ `wrong-answer-${idxx}` }
          key={ idxx }
          onClick={ () => this.alteraCorBtn('error') }
          disabled={ btnBool }
        >
          { e }
        </button>
      ));
      const answerCorrect = (
        <button
          className="correctResponse"
          type="button"
          data-testid="correct-answer"
          key="4"
          onClick={ () => this.alteraCorBtn(question.difficulty) }
          disabled={ btnBool }
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
          { !btnBool ? <Timer /> : '' }
        </div>
      );
    });
  }

  renderFinalJogo() {
    return (
      <Redirect to="/feedback" />
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
            btnBoolean: false,
          });
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
    if (questions && indice === questions.length - 1) { return this.renderFinalJogo(); }
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
