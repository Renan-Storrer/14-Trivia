import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import fetchQuestions from '../services/fetchQuestions';

class Main extends React.Component {
  state = {
    questions: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const verifyToken = 3;
    const data = await fetchQuestions();
    if (data.response_code !== verifyToken) {
      this.setState({ questions: data.results, isLoading: false });
    } else {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  render() {
    const { questions, isLoading } = this.state;
    return (
      (!isLoading)
        ? (
          <main>
            <Question questions={ questions } />
          </main>
        )
        : (
          <main>
            <h2>
              Loading...
            </h2>
          </main>
        )
    );
  }
}

Main.propTypes = {
  history: PropTypes.object,
}.isRequered;

export default Main;
