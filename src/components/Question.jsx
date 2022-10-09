import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  shuffleAnswers = () => {
    const { question } = this.props;
    const noMagicNumber = 0.5;

    if (question.type !== 'boolean') {
      const alternatives = [question.correct_answer, ...question.incorrect_answers];
      console.log('alternativas antes:', alternatives);
      return alternatives.sort(() => Math.random() - noMagicNumber);
      // const limit = 3;
      // const randomPosition = Math.floor(Math.random() * limit);

      // console.log('correta:', question.correct_answer);
      // console.log('incorreta:', question.incorrect_answers);

      // const alternatives = [...question.incorrect_answers];
      // const copyAnswer = alternatives[randomPosition];
      // alternatives.splice(randomPosition, randomPosition, question.correct_answer);
      // alternatives.push(copyAnswer);
      // console.log('alternativas antes:', alternatives);
      // return alternatives.sort(() => Math.random() - 1);
    }
    const alternatives = [question.correct_answer, ...question.incorrect_answers];
    return alternatives.sort(() => Math.random() - noMagicNumber);
  };

  render() {
    const { question } = this.props;
    const correctAnswer = question.correct_answer;

    const alternatives = this.shuffleAnswers();
    console.log('alternativas depois:', alternatives);
    console.log('correta:', correctAnswer);
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
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
                >
                  {item}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number,
  questions: PropTypes.array,
}.isRequered;

export default Question;
