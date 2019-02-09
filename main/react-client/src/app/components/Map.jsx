import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  directionsService: state.map.directionsService,
  directionsDisplay: state.map.directionsDisplay,
  locations: state.app.locations,
  currentPosition: state.map.currentPosition,
  map: state.map.map,
  markers: state.map.markers,
  infoWindows: state.map.infoWindows,
  destination: state.map.destination,
  user: state.app.user
});

const mapDispatchToProps = dispatch => ({
  updateUserMarker: marker =>
    dispatch({
      type: 'UPDATE_USER_MARKER',
      payload: marker
    }),
  recenterMap: (lat, lng) =>
    dispatch({
      type: 'RECENTER',
      payload: [lat, lng]
    }),
  init: () =>
    dispatch({
      type: 'INIT_MAP'
    }),
  changeRender: newRender =>
    dispatch({
      type: 'CHANGE_RENDER',
      payload: newRender
    }),
  getRestaurantInfo: yelpId =>
    dispatch({
      type: 'GET_INFO',
      payload: axios.get('restaurants/getInfo', {
        params: {
          id: yelpId
        }
      })
    }),
  deleteMarkers: () =>
    dispatch({
      type: 'DELETE_MARKERS'
    }),
  displayRoute: (marker, passedDestination = null) =>
    dispatch({
      type: 'DISPLAY_ROUTE',
      payload: {
        marker,
        passedDestination
      }
    }),
  updateOrigin: coordinates =>
    dispatch({
      type: 'UPDATE_ORIGIN',
      payload: coordinates
    }),

  updateDestination: coordinates =>
    dispatch({
      type: 'UPDATE_DESTINATION',
      payload: coordinates
    }),
  fetchDirections: (origin, destination) =>
    dispatch({
      type: 'FETCH_DIRECTIONS',
      payload: axios.get('/getRoutes', {
        params: {
          end_lat: destination.lat,
          end_lng: destination.lng,
          start_lat: origin.lat,
          start_lng: origin.lng
        }
      })
    }),
  updateMap: (locations, markers, infoWindows) =>
    dispatch({
      type: 'UPDATE_MAP',
      payload: {
        locations,
        markers,
        infoWindows
      }
    })
});

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  componentDidUpdate(prevProps) {
    let {
      updateUserMarker,
      recenterMap,
      user,
      map,
      directionsDisplay,
      directionsService,
      deleteMarkers,
      changeRender,
      getRestaurantInfo,
      updateMap
    } = this.props;
    let newLocations = this.props.locations;
    let isChanged = false;

    newLocations.forEach((location, i) => {
      if (
        !prevProps.locations[i] ||
        (location.coordinates.lat !== prevProps.locations[i].coordinates.lat &&
          location.coordinates.lng !== prevProps.locations[i].coordinates.lng)
      ) {
        isChanged = true;
      }
    });

    if (isChanged) {
      // Delete all markers on map
      deleteMarkers();
      // Create an array of alphabetical characters used to label the markers.
      let label = 0;
      const newInfoWindows = {};
      const markers = [];

      console.log('newLocations: ==> ', newLocations);

      newLocations.forEach(location => {
        label += 1;

        const contentStr =
          '<div id="content">' +
          `<h4 id="firstHeading">${location.title}</h4>` +
          '<div id="bodyContent">' +
          `<p>${location.address}</p>` +
          '</div>' +
          '</div>';

        const newMarker = new google.maps.Marker({
          position: {
            lat: location.coordinates.latitude,
            lng: location.coordinates.longitude
          },
          map,
          animation: google.maps.Animation.DROP,
          label: label.toString(),
          title: location.title
        });

        newInfoWindows[newMarker.label] = new google.maps.InfoWindow({
          content: contentStr
        });

        google.maps.event.addListener(newMarker, 'mouseover', () => {
          newInfoWindows[newMarker.label].open(map, newMarker);
        });

        google.maps.event.addListener(newMarker, 'mouseout', () => {
          newInfoWindows[newMarker.label].close();
        });

        google.maps.event.addListener(newMarker, 'click', () => {
          getRestaurantInfo(location.yelpId);
          changeRender('restaurantInfo');
        });

        markers.push(newMarker);
      });

      updateMap(newLocations, markers, newInfoWindows);
    }

    // If user location is found
    if (user.lat && user.lng) {
      if (user.marker) {
        user.marker.setMap(null);
      }

      const userMarker = new google.maps.Marker({
        position: {
          lat: user.lat,
          lng: user.lng
        },
        map,
        animation: google.maps.Animation.DROP,
        label: 'ME'
      });

      updateUserMarker(userMarker);
    }
  }

  render() {
    return <div id="map" />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
