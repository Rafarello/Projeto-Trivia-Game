import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import YouTube from 'react-youtube';
import Header from '../componets/Header';
import Timer from '../componets/Timer';
import { somaPlacar, resetplacar } from '../redux/actions/index';
import '../css/TelaDeJogo.css';

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
    const { resetPlacarAction } = this.props;
    this.requestQuestionsApi();
    this.saveToStore();
    resetPlacarAction();
  }

  ranking() {
    const { name, placar, email } = this.props;
    const player = { player: {
      name,
      picture: email,
      score: placar,
    } };
    const getStorageRanking = JSON.parse(localStorage.getItem('ranking'));
    const newArray = !getStorageRanking
      ? [player] : [...getStorageRanking, player];
    localStorage.setItem('ranking', JSON.stringify(newArray));
  }

  async requestQuestionsApi() {
    const questions = await requestQuestions();
    this.setState({
      questions: questions.results,
    });
  }

  alteraCorBtn(difficulty) {
    const DEZ = 10;
    const TRES = 3;
    this.setState({
      btnBoolean: true,
      btnProxima: true,
    });

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
    const { name, email, somaPlacarAction } = this.props;
    const player = { player: {
      name,
      gravatarEmail: email,
      score: getStorage.player.score + score,
      assertions: getStorage.player.assertions + 1,
    } };
    localStorage.setItem('state', JSON.stringify(player));
    somaPlacarAction(score);
  }

  pergunta(question, btnBool) {
    return (
      <div className="categoria-pergunta">
        <div className="card-pergunta">
          <div className="pergunta">
            <div data-testid="question-category" className="topico">
              <h3>Categoria :</h3>
              {question.category}
            </div>
            <div data-testid="question-text" className="topico">
              <h2>Pergunta :</h2>
              {question.question}
            </div>
          </div>
          { !btnBool ? <Timer /> : '' }
        </div>
      </div>
    );
  }

  saveToStore() {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    console.log(getStorage);
    const { name, placar = 0, email, assertions = 0 } = this.props;
    const player = { player: {
      name,
      gravatarEmail: email,
      score: placar,
      assertions,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  // Fun????o para embaralhar Array retirado do site: https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
  renderQuestions(array) {
    const { disableBtn } = this.props;
    const { btnBoolean } = this.state;
    const btnBool = disableBtn === 0 || btnBoolean;
    return array.map((question, idx) => {
      const arrayAnswerIncorrect = question.incorrect_answers.map((e, idxx) => (
        <button
          className="incorrectResponse button-resposta"
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
          className="correctResponse button-resposta"
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
        <div key={ idx } className="dois">
          <div data-testid="question-text" className="respostas">
            { shuffledArr.map((e) => (e))}
          </div>
          {this.pergunta(question, btnBool)}
        </div>
      );
    });
  }

  renderFinalJogo() {
    this.ranking();
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
        className="proxima-button"
        onClick={ () => {
          this.setState({ indice: indice + 1,
            btnBoolean: false,
          });
        } }
      >
        Pr??xima
      </button>
    );
  }

  render() {
    const audioYouTube = {
      playerVars: { autoplay: 1 },
    };
    const { questions, indice, btnProxima } = this.state;
    const renderQuestions = !questions ? 'Carregado...'
      : this.renderQuestions(questions)[indice];
    if (questions && indice === questions.length) { return this.renderFinalJogo(); }
    return (
      <div>
        <Header />
        <YouTube
          className="audioVideo"
          videoId="YvPYFCC1cL0"
          opts={ audioYouTube }
        />
        <div className="tela-de-jogo">
          <div className="box">
            <div className="a">
              {renderQuestions}
            </div>
            <div className="b">
              { !btnProxima ? ''
                : this.renderButtonProxima()}
            </div>
          </div>
        </div>
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
  resetPlacarAction: PropTypes.func.isRequired,
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
  resetPlacarAction: (e) => dispatch(resetplacar(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeJogo);
