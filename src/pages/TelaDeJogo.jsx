import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  alteraCorBtn(event) {
    const DEZ = 10;
    const TRES = 3;
    this.setState({ btnStyleIncorrect: { border: '3px solid rgb(255, 0, 0) ' },
      btnStyleCorrect: { border: '3px solid rgb(6, 240, 15)' },
      isTimer: false });

    const { disableBtn, somaPlacarAction } = this.props;
    switch (event.difficulty) {
    case 'easy':
      return somaPlacarAction(DEZ + (1 * +disableBtn));
    case 'medium':
      return somaPlacarAction(DEZ + (2 * +disableBtn));
    case 'hard':
      return somaPlacarAction(DEZ + (TRES * +disableBtn));
    default:
      return disableBtn;
    }
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
          onClick={ () => this.alteraCorBtn('') }
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
          onClick={ () => this.alteraCorBtn(question) }
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

  render() {
    const { questions, indice } = this.state;
    return (
      <div>
        <Header />
        <h2>Tela de Jogo</h2>
        { !questions ? 'Carregado...'
          : this.renderQuestions(questions)[indice]}
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
      </div>
    );
  }
}

TelaDeJogo.propTypes = {
  disableBtn: PropTypes.string.isRequired,
  somaPlacarAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disableBtn: state.timer.btnResposta,
  placar: state.timer.placar,
});

const mapDispatchToProps = (dispatch) => ({
  somaPlacarAction: (e) => dispatch(somaPlacar(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeJogo);
