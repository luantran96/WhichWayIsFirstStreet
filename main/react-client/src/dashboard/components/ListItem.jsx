import React from 'react';
import { Item, Button, Rating } from 'semantic-ui-react';

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
              <span className='ratings'><Rating icon='star' size='large' rating={restaurant.rating} maxRating={5} disabled /></span>
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