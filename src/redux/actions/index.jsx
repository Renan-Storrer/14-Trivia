import REQUEST_API from './actionsTypes';

const requestApi = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_API,
      token: data.token }))
    .catch((err) => {
      console.log(err);
    });
};

export default requestApi;
