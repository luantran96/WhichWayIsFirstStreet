import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import { Search, Grid, Header, Segment } from 'semantic-ui-react'

class Nav extends React.Component {
    constructor(props) {
      super(props);

      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.updateRestaurants = this.updateRestaurants.bind(this);
      }
    
    updateRestaurants(e, { result }) {
      console.log('selected restaurant:', result);
      const { dispatch } = this.props;

      dispatch({type: 'ADD_RESTAURANT_TO_DB', 
      payload: axios.post('/add', 
        {
          id: result.yelpId,
          result,
        }),
      });
    
    }

    handleSearchChange(e, { value }) {
      let {dispatch} = this.props;
      
      dispatch({type: 'START_SEARCH', payload: value});

      let search_value = this.props.value;

      if (search_value.length < 1) {
        dispatch({type: 'RESET_RESULTS'});
      }
     
    setTimeout(() => { 
      dispatch({
        type: 'SEARCH_RESTAURANTS',
        payload: axios.get('/search',
          {
            params: {
              name: search_value,
            }
          }
        ),
      });
    }, 50);
    
    }

    render() {
      const { isLoading, value, results } = this.props;
        return (
          <div id="nav-bar">
            <div>
              <Search
              fluid
              id="search"
              loading={isLoading}
              onResultSelect={this.updateRestaurants}
              placeholder="Search"
              onSearchChange={_.debounce(this.handleSearchChange, 50, { leading: false })}
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

const wrappedNav = connect((store) => {
  return {
    isLoading: store.nav.isLoading,
    results: store.nav.results,
    searchResults: store.nav.searchResults,
    value: store.nav.value, 
  };
})(Nav);

export default wrappedNav;