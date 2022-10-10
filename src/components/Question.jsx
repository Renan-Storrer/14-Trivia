import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  state = {
    id: 0,
    showBorder: 'hidden',
  };

  btnNext = () => {
    const { id } = this.state;
    const limit = 4;
    if (id < limit) {
      this.setState({ id: id + 1 });
    } else {
      this.setState({ id: 0 });
    }
    this.setState({ showBorder: 'hidden' });
  };

  shuffleAnswers = () => {
    const { id } = this.state;
    const { questions } = this.props;
    const noMagicNumber = 0.5;
    const altCorrect = questions[id].correct_answer;
    const altIncorrect = questions[id].incorrect_answers;

    if (questions[id].type !== 'boolean') {
      const alternatives = [altCorrect, ...altIncorrect];
      console.log('alternativas antes:', alternatives);
      return alternatives.sort(() => Math.random() - noMagicNumber);
    }
    const alternatives = [altCorrect, ...altIncorrect];
    return alternatives.sort(() => Math.random() - noMagicNumber);
  };

  handleClickAnswers = () => {
    this.setState({ showBorder: 'solid' });
  };

  render() {
    const { showBorder, id } = this.state;
    const { questions } = this.props;
    const correctAnswer = questions[id].correct_answer;

    const alternatives = this.shuffleAnswers();
    console.log('alternativas depois:', alternatives);
    console.log('correta:', correctAnswer);
    return (
      <div>
        <h2 data-testid="question-category">{ questions[id].category }</h2>
        <p data-testid="question-text">{ questions[id].question }</p>
        <div data-testid="answer-options">
          {
            alternatives.map((item, index) => {
              console.log('map:', item);
              return (
                <button
                  type="button"
                  key={ index }
                  data-testid={
                    (item === correctAnswer) ? 'correct-answer' : `wrong-answer-${index}`
                  }
                  style={ { border: `${item === correctAnswer
                    ? '3px solid rgb(6, 240, 15)' : '3px solid red'}`,
                  borderStyle: showBorder } }
                  onClick={ this.handleClickAnswers }
                >
                  {item}
                </button>
              );
            })
          }
        </div>
        <button type="button" onClick={ this.btnNext }>Next</button>
      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number,
  questions: PropTypes.array,
}.isRequered;

export default Question;
