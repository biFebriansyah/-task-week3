import { combineReducers } from 'redux'

import data from './User';

// const rootReducer = combineReducers({
//   data
// })

const reducers = {
  data
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

  if (action.type === "USER_LOGGED_OUT_SUCCESS") {
    state = {}
  }

  return appReducer(state, action);
}

export default rootReducer;
