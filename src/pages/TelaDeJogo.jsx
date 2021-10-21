import React, { Component } from 'react';
import Header from '../componets/Header';
import { requestQuestions } from '../services/requestAPITrivia';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      indice: 0,
      btnStyleIncorrect: {},
      btnStyleCorrect: {},
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

  funcaoFicaVermelho(td) {
    td.style.border = '#FF0F0F';
  }

  alteraCorBtn() {
    this.setState({ btnStyleIncorrect: { border: '3px solid rgb(255, 0, 0) ' },
    btnStyleCorrect: { border: '3px solid rgb(6, 240, 15)' } });
  }

  // Função para embaralhar Array retirado do site: https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
  renderQuestions(array) {
    const { btnStyleIncorrect, btnStyleCorrect } = this.state;
    return array.map((question, idx) => {
      const arrayAnswerIncorrect = question.incorrect_answers.map((e, idxx) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${idxx}` }
          key={ idxx }
          style={ btnStyleIncorrect }
          onClick={ this.alteraCorBtn }
        >
          { e }
        </button>
      ));
      const answerCorrect = (
        <button
          type="button"
          data-testid="correct-answer"
          key="4"
          onClick={ this.alteraCorBtn }
          style={ btnStyleCorrect }
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
        </div>
      );
    });
  }

  render() {
    const { questions, indice } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <h2>Tela de Jogo</h2>
        { !questions ? 'Carregado...'
          : this.renderQuestions(questions)[indice]}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => { this.setState({ indice: indice + 1 }); } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

export default TelaDeJogo;
