import React from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem.jsx';
import PropTypes from 'prop-types';


const List = ({restaurants, handleRestaurantListItemClick, handleButtonClick, showDetails}) => (
    <div>
    {restaurants.map(restaurant => <ListItem 
    restaurant={restaurant} 
    handleRestaurantListItemClick={handleRestaurantListItemClick}
    handleButtonClick={handleButtonClick} 
    showDetails={showDetails}
    />)}
    </div>
);

let mapStateToProps = (state) => {
    return {
        restaurants: state.app.restaurants,
    }
};

List.contextTypes = {
    store: PropTypes.object
}
const wrappedList = connect(mapStateToProps)(List);

export default wrappedList;

