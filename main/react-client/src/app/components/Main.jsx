import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import List from './List.jsx';
import Directions from './Directions.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  restaurants: state.app.restaurants,
  directions: state.app.directions,
  render: state.app.render,
  restaurant: state.restaurantInfo.restaurant,
  userId: state.app.user.uuid,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: bool => dispatch({
      type: 'SHOW_MODAL',
      payload: bool,
    }),
    removeMarkerFromMap: idx => dispatch({
      type: 'REMOVE_MARKER',
      payload: idx,
    }),
    updateRestaurantList: (restaurants) => {
      dispatch({
        type: 'UPDATE_RESTAURANTS_LIST',
        payload: restaurants,
      });
    },
    deleteRestaurant: _id => dispatch({
      type: 'DELETE_RESTAURANT',
      payload: axios.delete('restaurants/delete', {
        params: {
          _id,
        },
      }),
    }),
    fetchRestaurants: userId => dispatch({
      type: 'FETCH_RESTAURANTS',
      payload: axios.get('restaurants/selectAll', {
        params: {
          userId,
        },
      }),
    }),

    getRestaurantInfo: yelpId => dispatch({
      type: 'GET_INFO',
      payload: axios.get('restaurants/getInfo',
        {
          params: {
            id: yelpId,
          },
        }),
    }),
    fetchDirections: (destination, origin) => dispatch({
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
    changeRender: newRender => dispatch({
      type: 'CHANGE_RENDER',
      payload: newRender,
    }),
    updateDestination: coordinates => dispatch({
      type: 'UPDATE_DESTINATION',
      payload: coordinates,
    }),
  };
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.renderDetails = this.renderDetails.bind(this);
    this.handleRestaurantListItemClick = this.handleRestaurantListItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  //TODO: store restaurant info locally

  componentDidMount() {
    const { fetchRestaurants, userId } = this.props;
    fetchRestaurants(userId);
  }

  showDetails(restaurant) {
    const { getRestaurantInfo, changeRender } = this.props;

    getRestaurantInfo(restaurant.yelpId);
    changeRender('restaurantInfo');
  }

  handleButtonClick(restaurant) {
    const { restaurants, deleteRestaurant, removeMarkerFromMap } = this.props;

    const idx = restaurants.findIndex(element => element.description === restaurant.description);
    const restaurantToDelete = restaurants[idx];

    deleteRestaurant(restaurantToDelete._id);
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
        <div id="details">
          {this.renderDetails()}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  restaurants: PropTypes.instanceOf(Array).isRequired,
  directions: PropTypes.instanceOf(Array).isRequired,
  render: PropTypes.string.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
};
const wrappedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default wrappedMain;
