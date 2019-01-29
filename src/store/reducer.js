import { combineReducers } from 'redux-immutable';
import { reducer as carReducer } from '../pages/car/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
// console.log(carReducer);
const reducer = combineReducers({
  car: carReducer,
  detail: detailReducer,
  login: loginReducer
});

export default reducer;