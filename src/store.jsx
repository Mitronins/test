import {createStore} from 'redux';
import weatherReducer from './store/reducer'

// const reducers = combineReducers({
//     weatherState: weatherReducer,
// });

const store = createStore(weatherReducer);

export default store;