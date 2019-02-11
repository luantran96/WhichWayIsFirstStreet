import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

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

  componentDidUpdate() {
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


    let label = 0;
    const newInfoWindows = {};
    const markers = [];

    // console.log('newLocations: ==> ', newLocations);

    Object.keys(newLocations).forEach(yelpId => {
      label += 1;
      // If marker hasn't been drawn on Map
      if (!newLocations[yelpId].marker) {
        const contentStr =
          '<div id="content">' +
          `<h4 id="firstHeading">${newLocations[yelpId].title}</h4>` +
          '<div id="bodyContent">' +
          `<p>${newLocations[yelpId].address}</p>` +
          '</div>' +
          '</div>';

        const newMarker = new google.maps.Marker({
          position: {
            lat: newLocations[yelpId].coordinates.latitude,
            lng: newLocations[yelpId].coordinates.longitude
          },
          map,
          animation: google.maps.Animation.DROP,
          label: label.toString(),
          title: newLocations[yelpId].title
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
          getRestaurantInfo(newLocations[yelpId].yelpId);
          changeRender('restaurantInfo');
        });

        newLocations[yelpId].marker = newMarker;
      }
    });

    // updateMap(newLocations, markers, newInfoWindows);

    // If user location is found
    if (user.lat && user.lng) {
      if (!user.marker) {
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
  }

  render() {
    return <div id="map" />;
  }
}

Map.propTypes = {
  updateUserMarker: PropTypes.func.isRequired,
  recenterMap: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  map: PropTypes.instanceOf(Object).isRequired,
  directionsService: PropTypes.instanceOf(Object).isRequired,
  deleteMarkers: PropTypes.func.isRequired,
  changeRender: PropTypes.func.isRequired,
  getRestaurantInfo: PropTypes.func.isRequired,
  updateMap: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
