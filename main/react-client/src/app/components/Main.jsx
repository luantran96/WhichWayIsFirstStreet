import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import List from './List.jsx';
import Directions from './Directions.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';

const mapStateToProps = state => ({
  restaurants: state.app.restaurants,
  directions: state.app.directions,
  render: state.app.render,
  restaurant: state.restaurantInfo.restaurant,
  userId: state.app.user.uuid,
});

const mapDispatchToProps = dispatch => ({
  findMe: () => {
    dispatch({
      type: 'FIND_ME',
      payload: new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          window.alert("Your browser doesn't support geolocation");
        }
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;

            resolve([latitude, longitude]);
          },
          err => reject(err)
        );
      }),
    });
  },
  removeMarkerFromMap: idx =>
    dispatch({
      type: 'REMOVE_MARKER',
      payload: idx,
    }),
  updateRestaurantList: restaurants => {
    dispatch({
      type: 'UPDATE_RESTAURANTS_LIST',
      payload: restaurants,
    });
  },
  deleteRestaurant: (yelpId, userId) =>
    dispatch({
      type: 'DELETE_RESTAURANT',
      payload: axios.delete('restaurants/delete', {
        params: {
          yelpId,
          userId,
        },
      }),
    }),
  fetchRestaurants: userId =>
    dispatch({
      type: 'FETCH_RESTAURANTS',
      payload: axios.get('restaurants/selectAll', {
        params: {
          userId,
        },
      }),
    }),

  getRestaurantInfo: yelpId =>
    dispatch({
      type: 'GET_INFO',
      payload: axios.get('restaurants/getInfo', {
        params: {
          id: yelpId,
        },
      }),
    }),
  fetchDirections: (destination, origin) =>
    dispatch({
      type: 'FETCH_DIRECTIONS',
      payload: axios.get('/getRoutes', {
        params: {
          end_lat: destination.lat,
          end_lng: destination.lng,
          start_lat: origin.lat,
          start_lng: origin.lng,
        },
      }),
    }),
  changeRender: newRender =>
    dispatch({
      type: 'CHANGE_RENDER',
      payload: newRender,
    }),
  updateDestination: coordinates =>
    dispatch({
      type: 'UPDATE_DESTINATION',
      payload: coordinates,
    }),
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.renderDetails = this.renderDetails.bind(this);
    this.handleRestaurantListItemClick = this.handleRestaurantListItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    const { fetchRestaurants, userId, findMe } = this.props;
    fetchRestaurants(userId).then(() => {
      findMe();
    });
  }

  showDetails(restaurant) {
    const { getRestaurantInfo, changeRender } = this.props;

    getRestaurantInfo(restaurant.yelpId);
    changeRender('restaurantInfo');
  }

  handleButtonClick(restaurant) {
    const { restaurants, deleteRestaurant, removeMarkerFromMap, userId } = this.props;

    const idx = restaurants.findIndex(element => element.description === restaurant.description);
    const restaurantToDelete = restaurants[idx];

    deleteRestaurant(restaurantToDelete.yelpId, userId);
    removeMarkerFromMap(idx);
  }

  handleRestaurantListItemClick(restaurant) {
    const { fetchDirections, changeRender, updateDestination } = this.props;

    // Hardcoded origin position
    const currentPosition = {
      lat: 37.787484,
      lng: -122.396397,
    };

    fetchDirections(restaurant.coordinates, currentPosition);
    changeRender('directions');

    updateDestination(restaurant.coordinates);
  }

  renderDetails() {
    const { directions, render, restaurant } = this.props;
    if (render === 'directions' && directions) {
      return <Directions directions={directions} />;
    } else if (render === 'restaurantInfo' && restaurant) {
      return <RestaurantInfo />;
    }
  }

  render() {
    return (
      <div id="body">
        <div>
          <Nav />
        </div>
        <div id="main">
          <div id="left">
            <Map />
          </div>
          <div id="right">
            <List
              handleRestaurantListItemClick={this.handleRestaurantListItemClick}
              handleButtonClick={this.handleButtonClick}
              showDetails={this.showDetails}
            />
          </div>
        </div>
        <div id="details">{this.renderDetails()}</div>
      </div>
    );
  }
}

Main.propTypes = {
  restaurants: PropTypes.instanceOf(Array).isRequired,
  directions: PropTypes.instanceOf(Array).isRequired,
  render: PropTypes.string.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
  fetchDirections: PropTypes.func.isRequired,
  changeRender: PropTypes.func.isRequired,
  updateDestination: PropTypes.func.isRequired,
  deleteRestaurant: PropTypes.func.isRequired,
  removeMarkerFromMap: PropTypes.func.isRequired,
  fetchRestaurants: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  findMe: PropTypes.func.isRequired,
  getRestaurantInfo: PropTypes.func.isRequired,
};
const wrappedMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default wrappedMain;




