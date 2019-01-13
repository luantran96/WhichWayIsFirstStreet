const axios = require('axios');

let reducer = (state = {
  restaurants: [],
  restaurant_reviews: undefined,
  directions: undefined,
  destination: undefined,  
  locations: [],
  restaurantToAdd: undefined,
  render: 'directions',
}, action) => {

  switch (action.type) {

    case 'UPDATE_RESTAURANTS_LIST': {
      return {
        ...state,
        restaurants: action.payload,
      }
    }
    case 'CHANGE_RENDER': {
      return {
        ...state,
        render: action.payload,
      }
    }

    case 'DELETE_RESTAURANT_FULFILLED': {

      let restaurants = action.payload.data;

      let locations = restaurants.map(restaurant => {
        return {
          coordinates: restaurant.coordinates,
          title: restaurant.title,
        };
      });

      return {
        ...state,
        restaurants,
        locations,
      }
    }

    case 'FETCH_RESTAURANTS_FULFILLED': {

      let restaurants = action.payload.data;

      let locations = restaurants.map(restaurant => {
        return {
          coordinates: restaurant.coordinates,
          title: restaurant.title,
        };
      });

      return {
        ...state, 
        restaurants,
        locations,
      }
      break;
    }

    case 'ADD_RESTAURANT_TO_DB_FULFILLED': {
      let restaurants = action.payload.data;

      let locations = restaurants.map(restaurant => {
        return {
          coordinates: restaurant.coordinates,
          title: restaurant.title,
        };
      });

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'FETCH_DIRECTIONS_FULFILLED': {
      let directions = action.payload.data[0];

      return {
        ...state,
        directions,
        render: 'directions',
      }
    }


  }
    return state;
};

module.exports = reducer;