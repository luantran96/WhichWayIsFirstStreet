import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkerClusterer from '@google/markerclusterer';
import axios from 'axios';

let mapStateToProps = (state) => {
  return {
    directionsService: state.map.directionsService,
    directionsDisplay: state.map.directionsDisplay,
    locations: state.app.locations,
    currentPosition: state.map.currentPosition,
    map: state.map.map,
    markers: state.map.markers,
    infoWindows: state.map.infoWindows,
    destination: state.map.destination,    
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    init: () => 
      dispatch({
        type: 'INIT_MAP'
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
          passedDestination,
        }
      }),
    updateOrigin: (coordinates) => {
      dispatch({
        type: 'UPDATE_ORIGIN',
        payload: coordinates,
      })
    },
    updateDestination: (coordinates) => {
      dispatch({
        type: 'UPDATE_DESTINATION',
        payload: coordinates,
      })
    },
    fetchDirections: (origin, destination) =>
    dispatch({
      type: 'FETCH_DIRECTIONS',
      payload:  axios.get('/getRoutes', {
        params: {
          end_lat: destination.lat,
          end_lng: destination.lng,
          start_lat: origin.lat,
          start_lng: origin.lng,
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
    }),
  }
}

class Map extends Component {

  constructor(props) {
    super(props);

  this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

  componentDidMount() {
    this.props.init();
  }

  componentDidUpdate(prevProps) {
    let { map, directionsDisplay, directionsService } = this.props;
    let calculateAndDisplayRoute = this.calculateAndDisplayRoute;
    let newLocations = this.props.locations;
    let isChanged = false;

    if (prevProps.destination) {
      if (prevProps.destination.lat !== this.props.destination.lat && prevProps.destination.lng !== this.props.destination.lng) {
        calculateAndDisplayRoute(null, this.props.destination);
      } 
    } else if (this.props.destination) {
      calculateAndDisplayRoute(null, this.props.destination);     
    }

    this.props.updateDestination(this.props.destination);

    newLocations.forEach((location, i) => {
      if(!prevProps.locations[i] || location.coordinates.lat !== prevProps.locations[i].coordinates.lat && location.coordinates.lng !== prevProps.locations[i].coordinates.lng) {
        isChanged = true;
      }
    });

    if (isChanged) {
      // Delete all markers on map
      this.props.deleteMarkers();

      // Create an array of alphabetical characters used to label the markers.
      var label = 0;
      let newInfoWindows = {};
      var markers = [];

      console.log('newLocations: ==> ', newLocations);

      newLocations.forEach((location, i) => {

        label += 1;

        const newMarker = new google.maps.Marker({
          position: location.coordinates,
          map,
          label : label.toString(),
        });

        newInfoWindows[newMarker.label] = new google.maps.InfoWindow({
          content: location.title,
          map,
        });
      
        google.maps.event.addListener(newMarker, 'mouseover', function() {
          newInfoWindows[this.label].open(map, this);
        });
     
        google.maps.event.addListener(newMarker, 'mouseout', function() {
          newInfoWindows[this.label].close();
        });

        google.maps.event.addListener(newMarker, 'click', function() {
          calculateAndDisplayRoute(this);
        });

        markers.push(newMarker);
      });

      console.log('newInfoWindows: ', newInfoWindows);

      this.props.updateMap(newLocations, markers, newInfoWindows);

    }
  }

  calculateAndDisplayRoute( marker, passedDestination = null ) {

    this.props.deleteMarkers();
    const { currentPosition } = this.props;
    
    this.props.updateOrigin(new google.maps.LatLng(currentPosition.lat, currentPosition.lng));

    let destination;

    if (marker) {
      destination = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    }

    if(passedDestination) {
      destination = new google.maps.LatLng(passedDestination.lat, passedDestination.lng);
    }

    this.props.updateDestination(destination);

    console.log('LatLng object:', destination);

    this.props.fetchDirections({
      lat : destination.lat(),
      lng: destination.lng(),
    }, currentPosition);

    this.props.displayRoute(marker, destination);
  }

  render() {
    return (
        <div id= "map" />
    );
  }
}


  let wrappedMap =  connect(mapStateToProps, mapDispatchToProps)(Map);

export default wrappedMap;