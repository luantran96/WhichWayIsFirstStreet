import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem.jsx';

const List = ({restaurants, handleRestaurantListItemClick}) => (
    <div>
    {restaurants.map(restaurant => <ListItem restaurant={restaurant} handleRestaurantListItemClick={handleRestaurantListItemClick}/>)}
    </div>
);

export default List;

