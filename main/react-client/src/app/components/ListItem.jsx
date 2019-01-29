import React from 'react';
import { Item, Button, Rating, Label } from 'semantic-ui-react';

const ListItem = ({ restaurant, handleRestaurantListItemClick, handleButtonClick, showDetails, idx, price }) => (
  <div>
    <Item.Group>
      <Item
        className="list-item"
        onClick={() => showDetails(restaurant)}
      >
        <Item.Image
          src={restaurant.image_url}
        />
        <Item.Content>
          <Label color="blue" ribbon="left">
            {idx + 1}
          </Label>
          <Item.Header>
            {restaurant.name}
          </Item.Header>
          <Item.Meta><span className="ratings"><Rating icon="star" size="large" rating={restaurant.rating} maxRating={5} disabled /></span></Item.Meta>
          <Item.Description>
            <b>{restaurant.review_count + ' reviews'}</b>
          </Item.Description>
          <Item.Description>
            <b><i>{restaurant.distance ? restaurant.distance.toFixed(1) + ' miles' : ''}</i></b>
          </Item.Description>
          <Item.Extra>
            {price[restaurant.price]}
            <Button.Group>
              <Button
                onClick={() => handleButtonClick(restaurant)}
                negative
              >
                Delete
              </Button>
            </Button.Group>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  </div>
);

export default ListItem;