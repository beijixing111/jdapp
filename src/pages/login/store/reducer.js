import { fromJS } from 'immutable';
import * as constants from './constants';


const defaultState = fromJS({
  loginStatus: false
});


export default (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.LOGIN_IN:
      return state.set('loginStatus', true);
    case constants.LOGIN_OUT:
      return state.set('loginStatus', false);
    default:
      return state;
  }
};