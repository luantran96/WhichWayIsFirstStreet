import React from 'react';
import convertTime from 'convert-time';
import { Table, Rating, Item, Form, TextArea, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';


const RestaurantInfo = ({ restaurant }) => {
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

  console.log('restaurant in restaurantInfo: ', restaurant);

  restaurant.hours.map((day) => {
    let hour = `${convertTime(day.start.slice(0, 2) + ':' + day.start.slice(2))} - ${convertTime(day.end.slice(0, 2) + ':' + day.end.slice(2))}`;
    hours[day.day].push(hour);
  });

  console.log(restaurant.location);

  return (
    <div>
      <Item.Group>
        <Item>
          <div className="mapbox">
            <Item.Image
              size='medium'
              className="restaurantInfoImage"
              src={restaurant.image_url} />

            <div id="reviews">
              <div>
                <span className='labels'>Price range:</span> {`${restaurant.price}`}
              </div>
              <div>
                <span className='labels'>Address:</span> {`${restaurant.location}`}
              </div>
              <div>
                <span className='labels'>Contact:</span> {`${restaurant.display_phone}`}
              </div>
              <div>
                <span className='ratings'><Rating icon='star' size='huge' rating={restaurant.rating} maxRating={5} disabled /></span>
              </div>
              <div>
                <span className='labels'>Reviews: </span> {`${restaurant.review_count}`}
              </div>
            </div>
          </div>
          <Item.Content className="restaurantInfoContent">
            <Item.Header className="restaurantInfoHeader"><a href={restaurant.url}>{restaurant.name}</a></Item.Header>
            <Item.Description>
              <div className="descriptionContent">
                <div className="details">
                  <Form>
                    <TextArea id="noteForm" style={{ minHeight: 200, maxHeight: 200 }} placeholder='What was good here ?' />
                    <Button id="saveButton" color='red'>Save</Button>
                  </Form>
                </div>
                <div className="hours">
                  <Table celled collapsing>
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
                              <Table.Cell>
                                {(hours[day].join(', ') || 'Closed')} <span id="openNow">{(n === idx ? 'Open Now' : '')}</span>
                              </Table.Cell>

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

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurantInfo.restaurant,
  }
};

let wrappedRestaurantInfo = connect(mapStateToProps)(RestaurantInfo);

export default wrappedRestaurantInfo;

