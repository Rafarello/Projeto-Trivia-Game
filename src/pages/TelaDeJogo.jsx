import React, { Component } from 'react';
import Header from '../componets/Header';
import { requestQuestions } from '../services/requestAPITrivia';

class TelaDeJogo extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
    };
    this.requestQuestionsApi = this.requestQuestionsApi.bind(this);
  }

  componentDidMount() {
    this.requestQuestionsApi();
  }

  async requestQuestionsApi() {
    const questions = await requestQuestions();
    this.setState({ questions: questions.results });
  }

  // Função para embaralhar Array retirado do site: https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
  renderQuestions(array) {
    return array.map((question, idx) => {
      const arrayAnswerIncorrect = question.incorrect_answers.map((e, idxx) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${idxx}` }
          key={ idxx }
          onClick={ () => { } }
        >
          { e }
        </button>
      ));
      const answerCorrect = (
        <button
          type="button"
          data-testid="correct-answer"
          key="4"
          onClick={ () => { } }
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
          <h3 data-testid="question-text">
            { shuffledArr.map((e) => (e))}
          </h3>
        </div>
      );
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <h2>Tela de Jogo</h2>
        { !questions ? 'Carregado...'
          : this.renderQuestions(questions)}
      </div>
    );
  }
}

export default TelaDeJogo;
