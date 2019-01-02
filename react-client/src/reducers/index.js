import { combineReducers } from 'redux';
import app from './appReducer';
import restaurantInfo from './restaurantInfoReducer';

export default combineReducers({
    app,
    restaurantInfo,
});