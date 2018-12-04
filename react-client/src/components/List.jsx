import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem.jsx';

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

export default List;

