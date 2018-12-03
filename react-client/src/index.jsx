import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import Map from './components/Map.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
    }

    this.updateRestaurants = this.updateRestaurants.bind(this);
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

  render () {
    let { restaurants } = this.state;
    let locations = restaurants.map(restaurant => {
      return {
        coordinates: restaurant.coordinates,
        title: restaurant.title,
      };
    });

    console.log('restaurants in render(): ', restaurants);

    return (  
      <div id="body">
        <div id="nav-bar">
          <Nav 
          updateRestaurants={this.updateRestaurants}
          />
        </div>
        <div id="main">
          <div id="left">
            <Map locations={locations}/>
          </div>
          <div id="right">
          <List restaurants={restaurants} />
          </div>
        </div>
      </div>
    );
  }


}


ReactDOM.render(<App />, document.getElementById('app'));