import { combineReducers } from 'redux';
import loginUser from './loginUser';
import timer from './timer';

const rootReducer = combineReducers({
  loginUser,
  timer,
});

export default rootReducer;
