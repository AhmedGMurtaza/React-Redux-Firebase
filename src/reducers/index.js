import { combineReducers } from 'redux';
import customersReducer from './customers-reducers';
import ordersReducer from './orders-reducers';

const allReducers = combineReducers({
    customersReducer,
    ordersReducer
});

export default allReducers;