import { ADD_NAME_EMAIL } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    // console.log(action);
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
