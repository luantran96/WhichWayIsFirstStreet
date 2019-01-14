const axios = require('axios');

let reducer = (state = {
  restaurant: undefined,     
}, action) => {
  switch (action.type) {
    case 'GET_INFO_FULFILLED': {
      return {
        ...state,
        restaurant: action.payload.data,
      }
    }
  }
    return state;
};

module.exports = reducer;