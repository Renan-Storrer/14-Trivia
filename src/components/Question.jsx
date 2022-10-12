import React from 'react';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/fetchQuestions';
import '../css/answers.css';

class Question extends React.Component {
  state = {
    id: 0,
    // questions: [],
    alternatives: [],
    timeout: false,
    clicked: false,
    valid: true,
    seconds: 30,
    loading: true,
  };

  componentDidMount() {
    const { questions } = this.props;
    const { id } = this.state;
    this.tokenValidation();
    this.shuffleAnswers(questions[id]);
    this.timer();
  }

  componentDidUpdate() {
    const { id, valid } = this.state;
    const { questions } = this.props;
    if (valid === true) {
      this.shuffleAnswers(questions[id]);
    }
    this.stopTimer();
  }

  tokenValidation = async () => {
    const { history, questions } = this.props;
    const verifyToken = 3;
    const data = await fetchQuestions();
    if (data.response_code === verifyToken) {
      history.push('/');
    } else {
      this.setState({
        questions,
        loading: false,
      });
    }
  };

  timer = () => {
    const one = 1000;
    setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      } else {
        this.setState({ timeout: true, clicked: true });
      }
    }, one);
  };

  stopTimer = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  };

  btnNext = () => {
    const { history } = this.props;
    const { id } = this.state;
    const limit = 4;
    if (id === limit) {
      history.push('/feedback');
    }
    this.setState({
      id: id + 1, valid: true, clicked: false, seconds: 30, timeout: false,
    });
  };

  shuffleAnswers = (question) => {
    const noMagicNumber = 0.5;
    const altCorrect = question.correct_answer;
    const altIncorrect = question.incorrect_answers;
    const alternatives = [...altIncorrect, altCorrect];
    const altersShuffled = alternatives.sort(() => Math.random() - noMagicNumber);
    console.log(altersShuffled);
    this.setState({ alternatives: altersShuffled, valid: false });
  };

  handleClickAnswers = () => {
    this.setState({ clicked: true });
  };

  answerBorder = (item, question) => ((item === question.correct_answer)
    ? 'correct-answer'
    : 'incorrect-answer');

  displayQuestion = () => {
    const { id, questions, timeout,
      clicked, seconds, alternatives } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ questions[id].category }</h2>
        <p data-testid="question-text">{ questions[id].question }</p>
        <div>
          {seconds}
        </div>
        <div data-testid="answer-options">
          {
            alternatives.map((item, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ (questions[id].correct_answer === item)
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                className={ clicked
                  ? this.answerBorder(item, questions[id]) : '' }
                disabled={ clicked || timeout }
                onClick={ this.handleClickAnswers }
              >
                {item}
              </button>
            ))
          }
        </div>
        {clicked ? (
          <button
            type="button"
            onClick={ this.btnNext }
          >
            Next
          </button>
        )
          : ''}
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {
          loading ? ''
            : this.displayQuestion()
        }

      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number,
  questions: PropTypes.array,
}.isRequered;

export default Question;
