import { createStore } from 'redux';
import hotelReducer from './Reducer';

const store = createStore(hotelReducer);

export default store;
