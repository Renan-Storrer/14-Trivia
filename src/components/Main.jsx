import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

class Main extends React.Component {
  state = {
    id: 0,
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

  btnNext = () => {
    const { id } = this.state;
    const limit = 4;
    if (id < limit) {
      this.setState({ id: id + 1 });
    } else {
      this.setState({ id: 0 });
    }
  };

  render() {
    const { questions, id, isLoading } = this.state;
    // console.log(questions);
    return (
      (!isLoading)
        ? (
          <main>
            <Question question={ questions[id] } />
            <button type="button" onClick={ this.btnNext }>Next</button>
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
// comentáro
Main.propTypes = {
  history: PropTypes.object,
}.isRequered;

export default Main;
