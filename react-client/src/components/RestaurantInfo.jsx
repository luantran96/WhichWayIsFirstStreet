import React from 'react';
import { Header, Image, Rating, Item } from 'semantic-ui-react'

const RestaurantInfo = ({restaurant}) => (
    <div>
    <Item.Group>
    <Item>
      <Item.Image 
      size='medium' 
      className="restaurantInfoImage"
      src={restaurant.image_url} />
      <Item.Content className="restaurantInfoContent">
        <Item.Header className="restaurantInfoHeader"><a href={restaurant.url}>{restaurant.name}</a></Item.Header>
        <Item.Description>
        <div className="descriptionContent">
          <div className="details">
            <div>
              <span className='labels'>Price range:</span> {`${restaurant.price}`}
            </div>
            <div>
              <span className='labels'>Address:</span> {`${Object.values(restaurant.location).join(' ')}`}
            </div>
            <div>
              <span className='labels'>Contact:</span> {`${restaurant.display_phone}`}
            </div>
            <div>
              <span className='ratings'><Rating icon='star' size='huge' rating={restaurant.rating} maxRating={5}/></span>
            </div>
            <div>
              <span className='labels'>Reviews: </span> {`${restaurant.review_count}`}
            </div>
          </div>
          <div className="reviews">
          <Header as='h2'>
            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Hours:
          </Header>
          </div>
        </div>
        </Item.Description>
      </Item.Content>
    </Item>
    </Item.Group>
    </div>
);

export default RestaurantInfo;

