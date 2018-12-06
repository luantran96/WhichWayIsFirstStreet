import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import Map from './components/Map.jsx';
import List from './components/List.jsx';
import Directions from './components/Directions.jsx';
import RestaurantInfo from './components/RestaurantInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
      restaurant: null,
      render: 'directions',
      directions: undefined,
      destination: undefined,
    }

    this.updateRestaurants = this.updateRestaurants.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.handleRestaurantListItemClick = this.handleRestaurantListItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    axios.get('/selectAll')
    .then((items) => {
       console.log('items in /selectAll: ', items.data);
      this.setState({
        restaurants: items.data
      });
    });
  }

  showDetails(restaurant) {
    console.log(restaurant);

    axios.get('/getInfo',
    {
      params: {
        id: restaurant.yelpId,
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        restaurant: res.data,
        render: 'restaurantInfo',
      });
    });
  }

  updateRestaurants(e, { result }) {
    console.log('selected restaurant: ', result);

    axios.get('/getHours',
    {
      params: {
        id: result.yelpId,
      }
    }).then((hours) => {
      result.hours = hours.data;

      axios.post('/add', {
        result,
      })
      .then((res) => {
        let { restaurants } = this.state;
        restaurants.push(result);
    
        this.setState({
          restaurants,
        });
      });
    });
  }

  updateDestination(destination, origin = {
    lat: 37.787484,
    lng: -122.396397,
  }) {
    console.log('new destination: ', destination);

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
    let {directions, render, restaurant} = this.state;
    
    console.log('restaurant in renderDetails(): ', restaurant);
    
    if (render === 'directions' && directions) {
      return <Directions directions={directions} />;
    } else if (render === 'restaurantInfo' && restaurant) {
      return <RestaurantInfo restaurant={restaurant} />;
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
    console.log(restaurant);

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

  render () {
    let { restaurants, directions, destination } = this.state;
    let locations = restaurants.map(restaurant => {
      return {
        coordinates: restaurant.coordinates,
        title: restaurant.title,
      };
    });

    return (  
      <div id="body">
        <div>
          <Nav 
          updateRestaurants={this.updateRestaurants}
          />
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


ReactDOM.render(<App />, document.getElementById('app'));