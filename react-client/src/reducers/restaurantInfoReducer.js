const axios = require('axios');

let reducer = (state = {
  restaurant: undefined,  
  render: 'directions',    
}, action) => {
  switch (action.type) {
    case 'GET_INFO_FULFILLED': {
      return {
        ...state,
        restaurant: action.payload.data,
        render: 'restaurantInfo',
      }
    }
  }
    return state;
};

module.exports = reducer;