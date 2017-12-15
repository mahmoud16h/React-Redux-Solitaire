import {combineReducers} from 'redux';
import cardReducer from './cardReducer'
import indexReducer from './indexReducer'

const allReducers = combineReducers({
    cards : cardReducer,
});

export default allReducers;