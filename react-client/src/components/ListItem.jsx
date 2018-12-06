import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Item, Button } from 'semantic-ui-react';
import moment from 'moment';

const ListItem = ({restaurant, handleRestaurantListItemClick, handleButtonClick, showDetails}) => (
  <div>
  <Item.Group>
    <Item 
    className="list-item"
    >
      <Item.Image 
      src={restaurant.image}
      onClick={() => showDetails(restaurant)} />
        <Item.Content>
            <Item.Header>{restaurant.title}</Item.Header>
            <Item.Meta>{restaurant.description}</Item.Meta>
            <Item.Description>
               {`Today's hours: ${restaurant.hours.start} to ${restaurant.hours.end}`}
            </Item.Description> 
            <Item.Extra>{restaurant.price} 
              <Button.Group>
                <Button 
                onClick={() => handleRestaurantListItemClick(restaurant)}
                positive > Map </Button>
                <Button.Or />
                <Button 
                onClick={() => handleButtonClick(restaurant)}
                negative>Delete</Button>
              </Button.Group>
            </Item.Extra>
        </Item.Content>
    </Item>
  </Item.Group>
  </div>
);

export default ListItem;