import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Search, Icon } from 'semantic-ui-react';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.updateRestaurants = this.updateRestaurants.bind(this);
  }

  updateRestaurants(e, { result }) {
    const { dispatch, userId } = this.props;

    this.props.addRestaurant(result, userId);
  }

  handleSearchChange(e, { value }) {
    let { dispatch, user } = this.props;

    user.lat = user.lat || 37.691109;
    user.lng = user.lng || -122.472221;

    this.props.handleInputValue(value);

    let search_value = this.props.value;

    if (search_value.length < 1) {
      this.props.resetSearchResults();
    }

    setTimeout(() => {
      this.props.searchRestaurants(search_value, user.lat, user.lng);
    }, 50);
  }

  render() {
    const { isLoading, value, results, findMe } = this.props;
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
        <div id="plan-trip">PLAN TRIP</div>

        <div id="find-me-button" className="nav-button">
          <Icon name="location arrow" onClick={() => findMe()} />
        </div>
      </div>
    );
  }
}

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
  addRestaurant: (result, userId) => {
    dispatch({
      type: 'ADD_RESTAURANT_TO_DB',
      payload: axios.post('restaurants/add', {
        id: result.yelpId,
        userId,
      }),
    });
  },
  resetSearchResults: () => {
    dispatch({
      type: 'RESET_RESULTS',
    });
  },
  handleInputValue: value =>
    dispatch({
      type: 'START_SEARCH',
      payload: value,
    }),
  searchRestaurants: (value, lat, lng) =>
    dispatch({
      type: 'SEARCH_RESTAURANTS',
      payload: axios.get('restaurants/search', {
        params: {
          name: value,
          lat,
          lng,
        },
      }),
    }),
  showModal: bool =>
    dispatch({
      type: 'SHOW_MODAL',
      payload: bool,
    }),
});

export default connect(
  state => ({
    isLoading: state.nav.isLoading,
    results: state.nav.results,
    searchResults: state.nav.searchResults,
    value: state.nav.value,
    userId: state.app.user.uuid,
    user: state.app.user,
  }),
  mapDispatchToProps
)(Nav);
