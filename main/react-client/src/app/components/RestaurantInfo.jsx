import React from 'react';
import convertTime from 'convert-time';
import { Table, Rating, Form, Button } from 'semantic-ui-react';
// import phoneIcon from './../../../../static/images/phone-1s-200px.svg'
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

  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.id);

    this.setState({ [e.target.id]: e.target.value });
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
      <div className="restaurantInfo">
        <div className="restaurantInfo-left">
          <div className="info">
            <div className="info-header">
              <div className="restaurantInfoImage">
                <figure className="imghvr-hinge-down">
                  <img src={restaurant.image_url} alt="restaurant" />
                  <figcaption>
                    <h3>
                      <a href={restaurant.url}>View more on Yelp</a>
                    </h3>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div id="reviews">
              <div>
                <span className="restaurant-name"> {restaurant.name} </span>{' '}
              </div>
              <div>
                <img className="contact-icon " src="/static/images/contacts-1s-200px.svg" />
                {`${restaurant.location}`}
              </div>
              <div>
                <img className="contact-icon " src="/static/images/phone-1s-200px.svg" />
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
                <span>Based on </span>
                {`${restaurant.review_count}`} reviews
              </div>
            </div>
          </div>

          <div className="restaurantInfoContent">
            <div>
              <div className="descriptionContent">
                <div className="notes-content">
                  <div id="noteForm">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="dishName"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="validate"
                        />
                        <label for="dishName">Dish</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="dishNotes"
                          onChange={this.handleChange}
                          required
                          type="text"
                          className="validate"
                        />
                        <label for="dishNotes">How was it?</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <form action="#">
                          <p class="range-field">
                            <input 
                            id="dishRating"
                            onChange={this.handleChange}
                            className="active" type="range" min="0" max="5" />
                          </p>
                        </form>
                      </div>
                    </div>

                    <a
                      onClick={this.handleSubmit}
                      className="btn-floating btn-large waves-effect waves-light red">
                      <i class="material-icons">add</i>
                    </a>
                  </div>

                  {/* <Form id="noteForm">
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Dish name"
                      name="dishName"
                      placeholder="Ex: Padsee Ew"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths={1}>
                    <Form.Input
                      label="Description"
                      name="dishNotes"
                      placeholder="Ex: Too Dry"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths={1}>
                    <Rating icon="heart" defaultRating={0} maxRating={5} onRate={this.handleRate} />
                  </Form.Group>
                  <Button type="submit" color="instagram" onClick={this.handleSubmit}>
                    Add
                  </Button>
                </Form> */}

                  <div className="dish-list">
                    {restaurant.dishes.map(dish => {
                      return <DishInfo dish={dish} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="restaurantInfo-right">
          <div className="hours">
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

        {/* <div className="restaurantInfoContent">
          <div>
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
                    <Rating icon="heart" defaultRating={0} maxRating={5} onRate={this.handleRate} />
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
            </div>
          </div>
        </div> */}
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
