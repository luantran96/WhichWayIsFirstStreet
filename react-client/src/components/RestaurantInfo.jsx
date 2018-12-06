import React from 'react';

import { Header, Image, Table, Rating, Item, Icon } from 'semantic-ui-react'

const RestaurantInfo = ({restaurant}) => {
    
  let hours = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
  };

  let convertToDay = {
    '0': 'Monday',
    '1': 'Tuesday',
    '2': 'Wednesday',
    '3': 'Thursday',
    '4': 'Friday',
    '5': 'Saturday',
    '6': 'Sunday',
  }

  restaurant.hours[0].open.map((day) => {
    let hour = `${day.start} - ${day.end}`;
    hours[day.day].push(hour);
  });

  console.log('hours in restaurantInfo: ', hours);

  return (
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
          {/* <Header as='h2'>
            <Icon name='time' size='tiny' />
          </Header> */}
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Day</Table.HeaderCell>
                <Table.HeaderCell>Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                Object.keys(hours).map((day, idx) => {
                return (
                  <Table.Row>
                    <Table.Cell>{convertToDay[idx]}</Table.Cell>
                    <Table.Cell>{hours[day].join('\n') || 'Closed'}</Table.Cell>
                  </Table.Row>
                  );
                })
              }
              </Table.Body>
          </Table>
          </div>
        </div>
        </Item.Description>
      </Item.Content>
    </Item>
    </Item.Group>
    </div>
  )
};

export default RestaurantInfo;

