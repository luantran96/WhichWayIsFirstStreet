const axios = require('axios');

let reducer = (state = {
  restaurants: [],
  restaurant_reviews: undefined,
  directions: undefined,
  destination: undefined,  
  locations: [],
  restaurantToAdd: undefined,
  render: 'directions',
  isOpen: false,
  user: null,
}, action) => {

  switch (action.type) {
    case 'SHOW_MODAL': {
      return {
        ...state,
        isOpen : action.payload,
      }
    }

    case 'AUTHENTICATE_USER_FULFILLED': {
      return {
        ...state,
        user: action.payload.data,
      };
    }

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

    case 'REGISTER_USER_FULFILLED': {

      return {
        ...state,
        user: action.payload.data,
      };
    }

    case 'DELETE_RESTAURANT_FULFILLED': {
      const restaurants = action.payload.data;

      const locations = restaurants.map(restaurant => ({
        yelpId: restaurant.yelpId,
        coordinates: restaurant.coordinates,
        title: restaurant.title,
      }
      ));

      return {
        ...state,
        restaurants,
        locations,
      }
    }

    case 'FETCH_RESTAURANTS_FULFILLED': {
      const restaurants = action.payload.data;

      const locations = restaurants.map(restaurant => ({
        yelpId: restaurant.yelpId,
        coordinates: restaurant.coordinates,
        title: restaurant.title,
      }
      ));

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'ADD_RESTAURANT_TO_DB_FULFILLED': {
      const restaurants = action.payload.data;

      const locations = restaurants.map(restaurant => ({
        coordinates: restaurant.coordinates,
        title: restaurant.name,
      }
      ));

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'FETCH_DIRECTIONS_FULFILLED': {
      const directions = action.payload.data[0];

      return {
        ...state,
        directions,
        render: 'directions',
      };
    }

    default:
      return state;
  }
    return state;
};

module.exports = reducer;