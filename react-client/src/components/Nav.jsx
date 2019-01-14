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
      const { dispatch } = this.props;

      this.props.addRestaurant(result);
    }

    handleSearchChange(e, { value }) {
      let {dispatch} = this.props;
      
      this.props.handleInputValue(value);

      let search_value = this.props.value;

      if (search_value.length < 1) {
        this.props.resetSearchResults();
      }
     
    setTimeout(() => { 
      this.props.searchRestaurants(search_value);
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
            <div 
            id="login"
            onClick={() => this.props.showModal(true)}
            >
              SIGN IN
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRestaurant: (result) => {
      dispatch({type: 'ADD_RESTAURANT_TO_DB', 
      payload: axios.post('/add', 
        {
          id: result.yelpId,
          result,
        }),
      });      
    },
    resetSearchResults: () => {
      dispatch({
        type: 'RESET_RESULTS'
      })
    },   
    handleInputValue: (value) => {
      dispatch({
        type: 'START_SEARCH',
        payload: value,
      })
    },
    searchRestaurants: (value) => {
      dispatch({
        type: 'SEARCH_RESTAURANTS',
        payload: axios.get('/search',
        {
          params: {
            name: value,
          }
        }
      ),
      })
    },
    showModal: (bool) => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: bool,
      })
    }
  }
}

const wrappedNav = connect((store) => {
  return {
    isLoading: store.nav.isLoading,
    results: store.nav.results,
    searchResults: store.nav.searchResults,
    value: store.nav.value, 
  };
}, mapDispatchToProps)(Nav);

export default wrappedNav;