import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Item } from 'semantic-ui-react';

const ListItem = ({restaurant}) => (
  <div>
  <Item.Group>
    <Item className="list-item">
      <Item.Image src={restaurant.image} />
        <Item.Content>
            <Item.Header>{restaurant.title}</Item.Header>
            <Item.Meta>{restaurant.description}</Item.Meta>
            <Item.Description>
               {`Is it open: ${restaurant.is_closed ? 'NO WHY !?!?!?' : 'YES !!!!!'}`}
            </Item.Description>
            <Item.Extra>{restaurant.price}</Item.Extra>
        </Item.Content>
    </Item>
  </Item.Group>
  </div>
);

export default ListItem;