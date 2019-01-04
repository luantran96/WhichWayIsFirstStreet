import { combineReducers } from 'redux';
import app from './appReducer';
import restaurantInfo from './restaurantInfoReducer';
import nav from './navReducer';

export default combineReducers({
    app,
    restaurantInfo,
    nav,
});