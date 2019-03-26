import React from 'react';
import convertTime from 'convert-time';
import { Table, Rating, Item, Form, Button } from 'semantic-ui-react';
import DishInfo from './DishInfo.jsx';
import { connect } from 'react-redux';
import axios from 'axios';

class RestaurantInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishName: '',
      dishRating: '',
      dishNotes: '',
      convertToDay: {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { restaurant, submitNotes } = this.props;
    const { dishName, dishRating, dishNotes } = this.state;

    submitNotes(restaurant.yelpId, restaurant.userId, dishName, dishRating, dishNotes);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleRate(e, { rating }) {
    this.setState({ dishRating: rating });
    console.log(this.state);
  }

  render() {
    const { restaurant } = this.props;
    const { convertToDay } = this.state;
    const d = new Date();
    const n = d.getDay();

    let hours = {
      '0': [],
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': [],
    };

    restaurant.hours.map(day => {
      const hour = `${convertTime(
        day.start.slice(0, 2) + ':' + day.start.slice(2)
      )} - ${convertTime(day.end.slice(0, 2) + ':' + day.end.slice(2))}`;
      hours[day.day].push(hour);
    });

    return (
      <div>
        <Item.Group>
          <Item>
            <div className="mapbox animated fadeInLeft">
              <Item.Image
                size="medium"
                className="restaurantInfoImage"
                src={restaurant.image_url}
              />

              <div id="reviews">
                <div>
                  <span className="labels">Price range:</span>
                  {`${restaurant.price}`}
                </div>
                <div>
                  <span className="labels">Address:</span>
                  {`${restaurant.location}`}
                </div>
                <div>
                  <span className="labels">Contact:</span>
                  {`${restaurant.display_phone}`}
                </div>
                <div>
                  <span className="ratings">
                    <Rating
                      icon="star"
                      size="huge"
                      rating={restaurant.rating}
                      maxRating={5}
                      disabled
                    />
                  </span>
                </div>
                <div>
                  <span className="labels">Reviews: </span>
                  {`${restaurant.review_count}`}
                </div>
              </div>
            </div>
            <Item.Content className="restaurantInfoContent">
              <Item.Header className="restaurantInfoHeader animated fadeInDown">
                <a href={restaurant.url}>{restaurant.name}</a>
              </Item.Header>
              <Item.Description className="animated fadeInUp">
                <div className="descriptionContent">
                  <div className="details">
                    <Form id="noteForm">
                      <Form.Group widths={1}>
                        <Form.Input
                          label="Dish name"
                          name="dishName"
                          placeholder="Pan fried ice-cream"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group widths={1}>
                        <Form.Input
                          label="How was it?"
                          name="dishNotes"
                          placeholder="A little watery"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group widths={1}>
                        <Rating
                          icon="heart"
                          defaultRating={0}
                          maxRating={5}
                          onRate={this.handleRate}
                        />
                      </Form.Group>
                      <Button type="submit" color="instagram" onClick={this.handleSubmit}>
                        Add
                      </Button>
                    </Form>

                    <div className="dish-list">
                      <h1 className="dishes-title">Dishes</h1>
                      {restaurant.dishes.map(dish => {
                        return <DishInfo dish={dish} />;
                      })}
                    </div>
                  </div>
                  <div className="hours animated fadeInRight">
                    <Table celled collapsing>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Day</Table.HeaderCell>
                          <Table.HeaderCell>Hours</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {Object.keys(hours).map((day, idx) => {
                          return (
                            <Table.Row>
                              <Table.Cell>{convertToDay[idx]}</Table.Cell>
                              <Table.Cell>
                                {hours[day].join(', ') || 'Closed'}
                                <span id="openNow">{n === idx ? ' Open Now' : ''}</span>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurantInfo.restaurant,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitNotes: (yelpId, userId, dishName, dishRatings, dishNotes) => {
      dispatch({
        type: 'SUBMIT_NOTES',
        payload: axios.post('restaurants/addNotes', {
          yelpId,
          userId,
          dishName,
          dishRatings,
          dishNotes,
        }),
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfo);
