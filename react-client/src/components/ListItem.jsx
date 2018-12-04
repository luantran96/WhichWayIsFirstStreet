import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Item, Button } from 'semantic-ui-react';

const ListItem = ({restaurant, handleRestaurantListItemClick, handleButtonClick}) => (
  <div>
  <Item.Group>
    <Item 
    className="list-item"
    >
      <Item.Image 
      onClick={() => handleRestaurantListItemClick(restaurant)}
      src={restaurant.image} />
        <Item.Content>
            <Item.Header>{restaurant.title}</Item.Header>
            <Item.Meta>{restaurant.description}</Item.Meta>
            <Item.Description>
               {`Today's hours: ${restaurant.hours.start} to ${restaurant.hours.end}`}
            </Item.Description> 
            <Item.Extra>{restaurant.price} 
            <Button 
            negative
            onClick={() => handleButtonClick(restaurant)}>Delete</Button> </Item.Extra>
        </Item.Content>
    </Item>
  </Item.Group>
  </div>
);

export default ListItem;