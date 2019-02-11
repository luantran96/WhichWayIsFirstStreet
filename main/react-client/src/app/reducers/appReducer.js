const geolib = require('geolib');

const reducer = (state = {
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

    case 'UPDATE_USER_MARKER': {
      let { user } = state;
      user.marker = action.payload;
      return {
        ...state,
        user,
      };
    }

    case 'SHOW_MODAL':
    {
      return {
        ...state,
        isOpen: action.payload,
      };
    }

    case 'AUTHENTICATE_USER_FULFILLED':
    {
      return {
        ...state,
        user: action.payload.data,
      };
    }

    case 'UPDATE_RESTAURANTS_LIST':
    {
      return {
        ...state,
        restaurants: action.payload,
      };
    }
    case 'CHANGE_RENDER':
    {
      return {
        ...state,
        render: action.payload,
      };
    }

    case 'REGISTER_USER_FULFILLED':
    {
      return {
        ...state,
        user: action.payload.data,
      };
    }

    case 'FIND_ME_FULFILLED':
    {
      console.log(action);

      const user = { ...state.user };
      const restaurants = state.restaurants.slice();

      user.lat = action.payload[0];
      user.lng = action.payload[1];

      const MeterToMileFactor = 0.000621371;
      
      restaurants.forEach((restaurant) => {
        restaurant.distance = (geolib.getDistance({
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude,
          accuracy: 1,
        }, {
          latitude: user.lat,
          lng: user.lng,
        })) * MeterToMileFactor;
      });

      return {
        ...state,
        user,
        restaurants,
      };
    }

    case 'FILTER_BY':
    {
      const restaurants = state.restaurants.slice();
      const type = action.payload;

      if (type === 'reviews') {
        console.log("IN HERE");
        restaurants.sort((a, b) => b.review_count - a.review_count);
      } else if (type === 'distance') {
        restaurants.sort((a, b) => a.distance - b.distance);
      } else if (type === 'ratings') {
        restaurants.sort((a, b) => b.rating - a.rating);
      }

      const newLocations = restaurants.map(restaurant => ({
        yelpId: restaurant.yelpId,
        coordinates: restaurant.coordinates,
        title: restaurant.name,
        address: restaurant.location,
      }));

      return {
        ...state,
        restaurants,
        locations: newLocations,
      };
    }

    case 'DELETE_RESTAURANT_FULFILLED':
    {
      const yelpId = action.payload.data;
      let locations = Object.assign({}, state.locations);

      locations[yelpId].marker.setMap(null);

      delete locations[yelpId];

      // const locations = restaurants.map(restaurant => ({
      //   yelpId: restaurant.yelpId,
      //   coordinates: restaurant.coordinates,
      //   title: restaurant.name,
      //   address: restaurant.location,
      // }));

      return {
        ...state,
        locations,
      };
    }

    case 'FETCH_RESTAURANTS_FULFILLED':
    {
      const restaurants = action.payload.data;

      const locations = {};

      restaurants.forEach(restaurant => {
        locations[restaurant.yelpId] = {
          coordinates: restaurant.coordinates,
          title: restaurant.name,
          address: restaurant.location,
          marker: null
        };
      });

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'ADD_RESTAURANT_TO_DB_FULFILLED':
    {
      const restaurants = state.restaurants.slice();
      const locations = Object.assign({}, state.locations);
      const newRestaurant = action.payload.data;

      restaurants.push(newRestaurant);

      locations[newRestaurant.yelpId] = {
        coordinates: newRestaurant.coordinates,
        title: newRestaurant.name,
        address: newRestaurant.location,
      };

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'FETCH_DIRECTIONS_FULFILLED':
    {
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
};

module.exports = reducer;
