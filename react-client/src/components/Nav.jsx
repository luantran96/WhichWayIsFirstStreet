import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          "isLoading": false,
          "results": [],
          "searchResults": [],
          "value": "", 
        } 

      this.handleSearchChange = this.handleSearchChange.bind(this);
      }

    handleSearchChange(e, { value }) {
      let price = {
        '$': 'under $10',
        '$$': '$11-$30',
        '$$$': '$31-$60',
        '$$$$': 'above $61',
      };

      this.setState(
        { 
          isLoading: true,
          value, 
        });
      
      if (this.state.value.length < 1) {
        this.setState({
          results: [],
        });
      }
     
    setTimeout(() => {
      axios.get('/search',
      {
        params: {
          name: value,
        }
      }
      )
      .then((results) => {
        const {businesses} = results.data;
        console.log(businesses);

        let entries = businesses.slice(0,5).map((business) => {
          let entry = {
            yelpId: business.id,
            url: business.url,
            title: business.name,
            description: business.location.display_address.join(),
            image: business.image_url,
            price: price[business.price],
            coordinates: {
              lat: business.coordinates.latitude,
              lng: business.coordinates.longitude,
            },
            is_closed: business.is_closed,
          }
          
          return entry;
        });
        
        this.setState({
          results: entries,
          isLoading: false,
        });
      });
    }, 300);
    
    }

    render() {
      const { isLoading, value, results } = this.state;
      const { updateRestaurants } = this.props;

        return (
          <div id="nav-bar">
            <div>
              <Search
              fluid
              id="search"
              loading={isLoading}
              onResultSelect={updateRestaurants}
              placeholder="Search"
              onSearchChange={_.debounce(this.handleSearchChange, 100, { leading: true })}
              value={value}
              results={results}
              />
            </div>
            <div id="login">
              SIGN IN
            </div>
          </div>
        );
    }
}

export default Nav;