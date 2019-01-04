import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Nav from './Nav.jsx';
import Map from './Map.jsx';
import List from './List.jsx';
import Directions from './Directions.jsx';
import RestaurantInfo from './RestaurantInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.updateDestination = this.updateDestination.bind(this);
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
  }

  updateDestination(destination, origin = {
    lat: 37.787484,
    lng: -122.396397,
  }) {

    axios.get('/getRoutes', {
      params: {
        end_lat: destination.lat,
        end_lng: destination.lng,
        start_lat: origin.lat,
        start_lng: origin.lng,
      }
    })
    .then((res) => {
      this.setState({
        directions: res.data[0],
        render: 'directions',
      });
    });
  }



  renderDetails() {
    let {directions, render, restaurant} = this.props;
        
    if (render === 'directions' && directions) {
      return <Directions directions={directions} />;
    } else if (render === 'restaurantInfo' && restaurant) {
      return <RestaurantInfo restaurant={restaurant}/>;
    }
  }

  handleButtonClick(restaurant) {
    let { restaurants } = this.state;

    let idx = restaurants.findIndex(element => element.description === restaurant.description);
    let restaurantToDelete = restaurants[idx];

    restaurants.splice(idx, 1);

    axios.delete('/delete', {
      params:{
        _id: restaurantToDelete._id,
      },
    })
    .then((res) => {
      console.log('OK');
    }); 

    this.setState({
      restaurants,
    });
  }

  handleRestaurantListItemClick(restaurant) {
    // Hardcoded origin position 

    let currentPosition = {
      lat: 37.787484,
      lng: -122.396397,
    };

    this.updateDestination(restaurant.coordinates, currentPosition);

    this.setState({
      destination: restaurant.coordinates,
    });
  }

  render() {
    let { restaurants, directions, destination } = this.props;
    let locations = restaurants.map(restaurant => {
      return {
        coordinates: restaurant.coordinates,
        title: restaurant.title,
      };
    });

    return (  
      <div id="body">
        <div>
          <Nav />
        </div>
        <div id="main">

          <div id="left">
            <Map 
            locations={locations} 
            updateDestination={this.updateDestination} 
            destination={destination}/>
          </div>
          <div id="right">
            <List 
            restaurants={restaurants} 
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

const mapStateToProps = (store) => {
  return {
    restaurants: store.app.restaurants,
    directions: store.app.directions,
    destination: store.app.destination,
    render: store.restaurantInfo.render,
    restaurant: store.restaurantInfo.restaurant,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
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
      
  }
}

const wrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);



export default wrappedApp;
