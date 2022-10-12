import { ADD_NAME_EMAIL, ADD_SCORE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  hits: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    // console.log(action);
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload.score,
      hits: state.hits + 1,
    };
  default:
    return state;
  }
};

export default player;
