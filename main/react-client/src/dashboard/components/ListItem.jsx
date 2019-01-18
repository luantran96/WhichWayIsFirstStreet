import React from 'react';
import { Item, Button, Rating, Label } from 'semantic-ui-react';

const ListItem = ({restaurant, handleRestaurantListItemClick, handleButtonClick, showDetails, idx}) => (
  <div>
  <Item.Group>
    <Item 
    className="list-item"
    >
      <Item.Image 
      src={restaurant.image}
      onClick={() => showDetails(restaurant)} />
        <Item.Content>
        <Label color='blue' ribbon= 'left'>
                {idx + 1}
              </Label>
            <Item.Header>
            {restaurant.title}
            </Item.Header>
            <Item.Meta>{restaurant.description}</Item.Meta>
            <Item.Description>
              <span className='ratings'><Rating icon='star' size='large' rating={restaurant.rating} maxRating={5} disabled /></span>
            </Item.Description> 
            <Item.Extra>{restaurant.price} 
              <Button.Group>
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