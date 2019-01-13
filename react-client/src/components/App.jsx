import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Nav from './Nav.jsx';
import Map from './Map.jsx';
import List from './List.jsx';
import Directions from './Directions.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';


//TODO: Look up how to get subscribe to work 

const mapStateToProps = (state) => {
  return {
    restaurants: state.app.restaurants,
    directions: state.app.directions,
    destination: state.map.destination,
    render: state.app.render,
    restaurant: state.restaurantInfo.restaurant,
    locations: state.app.locations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRestaurantList: (restaurants) => {
      dispatch({
        type: 'UPDATE_RESTAURANTS_LIST',
        payload: restaurants,
      })
    },
    deleteRestaurant: (_id) => 
      dispatch({
        type: 'DELETE_RESTAURANT',
        payload: axios.delete('/delete', {
             params:{
              _id,
             },
           })
      }),
    fetchRestaurants: () => 
      dispatch({
        type: 'FETCH_RESTAURANTS', 
        payload: axios.get('/selectAll'),
      }),

    getRestaurantInfo: (yelpId) => 
      dispatch({
        type: 'GET_INFO',
        payload: axios.get('/getInfo',
        {
          params: {
            id: yelpId,
          }
        }),
      }),

      fetchDirections: (destination, origin) =>
        dispatch({
          type: 'FETCH_DIRECTIONS',
          payload:  axios.get('/getRoutes', {
            params: {
              end_lat: destination.lat,
              end_lng: destination.lng,
              start_lat: origin.lat,
              start_lng: origin.lng,
            }
          })
        }),

      changeRender: (newRender) => {
        dispatch({
          type: 'CHANGE_RENDER',
          payload: newRender,
        })
      },
      updateDestination: (coordinates) => {
        dispatch({
          type: 'UPDATE_DESTINATION',
          payload: coordinates,
        })
      }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.renderDetails = this.renderDetails.bind(this);
    this.handleRestaurantListItemClick = this.handleRestaurantListItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() { 
    this.props.fetchRestaurants();  
  }

  showDetails(restaurant) {   
    this.props.getRestaurantInfo(restaurant.yelpId);
    this.props.changeRender('restaurantInfo');
  }

  renderDetails() {
    let {directions, render, restaurant} = this.props;
        
    if (render === 'directions' && directions) {
      return <Directions directions={directions} />;
    } else if (render === 'restaurantInfo' && restaurant) {
      return <RestaurantInfo />;
    }
  }

  handleButtonClick(restaurant) {
    let { restaurants } = this.props;

    let idx = restaurants.findIndex(element => element.description === restaurant.description);
    let restaurantToDelete = restaurants[idx];
    // restaurants.splice(idx, 1);

    this.props.deleteRestaurant(restaurantToDelete._id);
    // this.props.updateRestaurantList(restaurants);

    // axios.delete('/delete', {
    //   params:{
    //     _id: restaurantToDelete._id,
    //   },
    // })
    // .then((res) => {
    //   console.log('OK');
    // }); 

    // this.setState({
    //   restaurants,
    // });
  }

  handleRestaurantListItemClick(restaurant) {
    // Hardcoded origin position 
    let currentPosition = {
      lat: 37.787484,
      lng: -122.396397,
    };

    debugger;
    this.props.fetchDirections(restaurant.coordinates, currentPosition);
    this.props.changeRender('directions');
    console.log(this.props);

    this.props.updateDestination(restaurant.coordinates);
  }

  render() {
    let { locations, directions, destination } = this.props;

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
            showDetails={this.showDetails}/>
          </div>
        </div>
        <div id="details">
          {this.renderDetails()}
          </div>
      </div>
    );
  }
}

const wrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);



export default wrappedApp;
