import React from 'react';
import { Header, Table, Rating, Item } from 'semantic-ui-react'

const RestaurantInfo = ({restaurant}) => (
    <div>
    <Item.Group>
    <Item>
      <Item.Image 
      size='medium' 
      className="restaurantInfoImage"
      src={restaurant.image_url} />
      <Item.Content className="restaurantInfoContent">
        <Item.Header><a href={restaurant.url}>{restaurant.name}</a></Item.Header>
        <Item.Description>
        <div className="descriptionContent">
          <div className="details">
            <div>
              <span className='price'>{`Price range: ${restaurant.price}`}</span>
            </div>
            <div>
              <span className='address'>{`Address: ${Object.values(restaurant.location).join(' ')}`}</span>
            </div>
            <div>
              <span className='phone'>{` Contact: ${restaurant.display_phone}`}</span>
            </div>
            <div>
              <span className='rating'><Rating rating={restaurant.rating} maxRating={5}/></span>
            </div>
            <div>
              <span className='reviews'>{`Reviews: ${restaurant.review_count}`}</span>
            </div>
          </div>
          <div className="reviews">

          </div>
        </div>
        </Item.Description>
      </Item.Content>
    </Item>
    </Item.Group>
    </div>
);

export default RestaurantInfo;

