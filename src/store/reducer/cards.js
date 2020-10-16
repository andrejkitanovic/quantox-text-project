import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CARDS:
      return action.data;
    case actionTypes.ADD_CARD:
      return state ? state : [action.data];
    default:
      return state;
  }
};

export default reducer;
