const axios = require('axios');

let reducer = (state = {
    price : {
      '$': 'under $10',
      '$$': '$11-$30',
      '$$$': '$31-$60',
      '$$$$': 'above $61',
    },
    "isLoading": false,
    "results": [],
    "searchResults": [],
    "value": "",     
    "hours": null,
}, action) => {
  switch (action.type) {
    case 'START_SEARCH': {
      return {
        ...state,
        isLoading: true,
        value: action.payload,
      }
    }

    case 'RESET_RESULTS': {
      return {
        ...state,
        results: [],
      }
    }

    case 'SEARCH_RESTAURANTS_FULFILLED': {
      const { businesses } = action.payload.data;
      const { price } = state; 

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

      return {
        ...state,
        results: entries,
        isLoading: false,
      }
    }
  }
    return state;
};

module.exports = reducer;