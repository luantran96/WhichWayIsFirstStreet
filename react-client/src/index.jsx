import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import Map from './components/Map.jsx';
import List from './components/List.jsx';
import Directions from './components/Directions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
      directions: undefined,
      destination: undefined,
    }

    this.updateRestaurants = this.updateRestaurants.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.renderDirections = this.renderDirections.bind(this);
    this.handleRestaurantListItemClick = this.handleRestaurantListItemClick.bind(this);

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

  updateRestaurants(e, { result }) {
    console.log('selected restaurant: ', result);

    axios.get('/getHours',
    {
      params: {
        id: result.id,
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

  updateDestination(destination, origin) {
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
      console.log(res.data[0]);
      this.setState({
        directions: res.data[0],
      });
    });
  }

  renderDirections() {
    let {directions} = this.state;

    console.log('directions in index.jsx: ', directions);
    
    if (directions) {
      return <Directions directions={directions} />;
    } 
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
        <div id="nav-bar">
          <Nav 
          updateRestaurants={this.updateRestaurants}
          />
        </div>
        <div id="main">

          <div id="left">
            <Map locations={locations} updateDestination={this.updateDestination} destination={destination}/>
          </div>
          <div id="right">
            <List restaurants={restaurants} handleRestaurantListItemClick={this.handleRestaurantListItemClick}/>
          </div>
        </div>
        <div id="directions">
          {this.renderDirections()}
          </div>
      </div>
    );
  }


}


ReactDOM.render(<App />, document.getElementById('app'));