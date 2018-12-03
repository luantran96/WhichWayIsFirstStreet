import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem.jsx';

const List = ({restaurants}) => (
    <div>
    {restaurants.map(restaurant => <ListItem restaurant={restaurant}/>)}
    </div>
);

export default List;

