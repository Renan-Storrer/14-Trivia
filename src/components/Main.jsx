import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

class Main extends React.Component {
  state = {
    questions: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const verifyToken = 3;

    const data = await this.fetchQuestions();
    if (data.response_code !== verifyToken) {
      this.setState({ questions: data.results, isLoading: false });
    } else {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log('data.results:', data.results);
    return data;
  };

  render() {
    const { questions, isLoading } = this.state;
    // console.log(questions);
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
