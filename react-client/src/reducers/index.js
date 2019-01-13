import { combineReducers } from 'redux';
import app from './appReducer';
import restaurantInfo from './restaurantInfoReducer';
import nav from './navReducer';
import map from './mapReducer';

export default combineReducers({
    app,
    restaurantInfo,
    nav,
    map,
});