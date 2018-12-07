import React from 'react';
import { Table, Rating, Item, Form, TextArea } from 'semantic-ui-react'

const RestaurantInfo = ({restaurant, restaurant_reviews}) => {  
  let hours = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
  };

  var d = new Date();
  var n = d.getDay();

  console.log(n);

  let convertToDay = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
  }

  restaurant.hours[0].open.map((day) => {
    let hour = `${day.start} - ${day.end}`;
    hours[day.day].push(hour);
  });

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
          <Form id="noteForm">
            <TextArea placeholder='Tell us more' style={{ minHeight: 250 }} />
          </Form>
          </div>
          <div className="hours">
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
                        <Table.Cell>{(hours[day].join(', ') || 'Closed')} <span id="openNow">{(n === idx ? 'Open Now' : '')}</span></Table.Cell>
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
    <Item>
      <div id="reviews">
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
    </Item>
    </Item.Group>
    </div>
  )
};

export default RestaurantInfo;

