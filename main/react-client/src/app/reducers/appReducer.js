
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
    case 'SHOW_MODAL': {
      return {
        ...state,
        isOpen: action.payload,
      };
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
      };
    }
    case 'CHANGE_RENDER': {
      return {
        ...state,
        render: action.payload,
      };
    }

    case 'REGISTER_USER_FULFILLED': {
      return {
        ...state,
        user: action.payload.data,
      };
    }

    case 'FIND_ME_FULFILLED': {
      console.log(action);

      const user = { ...state.user };

      user.lat = action.payload[0];
      user.lng = action.payload[1];

      return {
        ...state,
        user,
      };
    }

    case 'FILTER_BY': {
      const restaurants = state.restaurants.slice();
      const type = action.payload;

      if (type === 'reviews') {
        console.log("IN HERE");
        restaurants.sort((a, b) => a.review_count - b.review_count);
      } else if (type === 'distance') {
        // TODO: GET GEOLOCATION WORKING !!!
        // restaurants.sort((a, b) => a.distance - b.distance);
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

    case 'DELETE_RESTAURANT_FULFILLED': {
      const restaurants = action.payload.data;

      const locations = restaurants.map(restaurant => ({
        yelpId: restaurant.yelpId,
        coordinates: restaurant.coordinates,
        title: restaurant.name,
        address: restaurant.location,
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
        title: restaurant.name,
        address: restaurant.location,
      }
      ));

      return {
        ...state,
        restaurants,
        locations,
      };
    }

    case 'ADD_RESTAURANT_TO_DB_FULFILLED': {
      const restaurants = state.restaurants.slice();
      const locations = state.locations.slice();
      const newRestaurant = action.payload.data;

      restaurants.push(newRestaurant);

      locations.push({
        yelpId: newRestaurant.yelpId,
        coordinates: newRestaurant.coordinates,
        title: newRestaurant.name,
        address: newRestaurant.location,
      });

      // const locations = restaurants.map(restaurant => ({
      //   yelpId: restaurant.yelpId,
      //   coordinates: restaurant.coordinates,
      //   title: restaurant.name,
      //   address: restaurant.location,
      // }
      // ));

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
};

module.exports = reducer;
