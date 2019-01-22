import { combineReducers } from 'redux-immutable';
import { reducer as carReducer } from '../pages/car/store';

// console.log(carReducer);
const reducer = combineReducers({
  car: carReducer,
});

export default reducer;