import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem.jsx';

const List = ({restaurants, handleRestaurantListItemClick, handleButtonClick}) => (
    <div>
    {restaurants.map(restaurant => <ListItem 
    restaurant={restaurant} 
    handleRestaurantListItemClick={handleRestaurantListItemClick}
    handleButtonClick={handleButtonClick} 
    />)}
    </div>
);

export default List;

