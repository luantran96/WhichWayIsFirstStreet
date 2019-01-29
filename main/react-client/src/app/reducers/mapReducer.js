const axios = require('axios');

let reducer = (state = {
  currentPosition: {
    lat: 37.787484,
    lng: -122.396397,
  },
  locations: [],
  map: undefined,
  markers: [],
  infoWindows: {},
  destination: [],
  origin: undefined,
  directionsService: undefined,
  directionsDisplay: undefined,
}, action) => {
  switch (action.type) {
    case 'RECENTER': {
      const { map } = state;

      map.setCenter = {
        lat: action.payload[0],
        lng: action.payload[1],
      };

      
      return {
        ...state,
        map,
      };
    }

    case 'INIT_MAP': {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;

      let currentPosition = state.currentPosition;

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: currentPosition,
        zoom: 10,
      });

      directionsDisplay.setMap(map);

      return {
        ...state,
        map,
        directionsService,
        directionsDisplay,
      };
    }

    case 'UPDATE_ORIGIN': {
      return {
        ...state,
        origin: action.payload,
      };
    }

    case 'UPDATE_DESTINATION': {
      return {
        ...state,
        destination: action.payload,
      };
    }
    case 'REMOVE_MARKER': {
      const { markers } = state;
      const idx = action.payload;
      markers[idx].setMap(null);
      markers.splice(idx, 1);

      return {
        ...state,
        markers,
      };
    }

    case 'DELETE_MARKERS': {
      const { markers } = state;
      markers.forEach(marker => marker.setMap(null));

      return {
        ...state,
        locations: [],
        markers: [],
      };
    }

    case 'CALCULATE_ROUTE': {
      const { directionsService, directionsDisplay } = state;

      directionsService.route({
        origin,
        destination,
        travelMode: 'DRIVING',
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      return {
        ...state,
        directionsDisplay,
        directionsService,
      };
    }

    case 'UPDATE_MAP': {
      const { markers, locations, infoWindows } = action.payload;

      return {
        ...state,
        markers,
        locations,
        infoWindows,
      }
    }

    default: return state;
  }
};

module.exports = reducer;