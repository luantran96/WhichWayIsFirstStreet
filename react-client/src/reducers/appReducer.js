const axios = require('axios');

let reducer = (state = {
  restaurants: [],
  restaurant: undefined,
  restaurant_reviews: undefined,
  directions: undefined,
  destination: undefined,
  render: 'directions',   
}, action) => {

  switch (action.type) {
    case 'FETCH_RESTAURANTS_FULFILLED': {
      return {
        ...state, 
        restaurants: action.payload.data,
      }

      break;
    }
  }
    return state;
};

module.exports = reducer;