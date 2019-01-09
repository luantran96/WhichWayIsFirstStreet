const axios = require('axios');

let reducer = (state = {
  restaurants: [],
  restaurant_reviews: undefined,
  directions: undefined,
  destination: undefined,  
  locations: [],
  restaurantToAdd: undefined,
}, action) => {

  switch (action.type) {

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
      let newRestaurant = action.payload;
     
      return {
        ...state,
        restaurantToAdd: newRestaurant.data,
      };
    }

  }
    return state;
};

module.exports = reducer;