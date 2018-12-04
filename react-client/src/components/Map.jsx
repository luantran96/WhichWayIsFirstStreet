import React, { Component } from 'react';
import { render } from 'react-dom';
import MarkerClusterer from '@google/markerclusterer';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {},
      locations: this.props.locations,
      map: undefined,
      markers: [],
      infoWindows: {},
    };

  this.deleteMarkers = this.deleteMarkers.bind(this);
  this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

  componentDidMount() {
    const { locations } = this.state;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

      let currentPosition = {
        lat: 37.787484,
        lng: -122.396397,
      };
          
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: currentPosition,
        zoom: 11
      });
  
      directionsDisplay.setMap(map);

      this.setState({
        map,
        currentPosition,
        directionsService,
        directionsDisplay,
      });
  }

  deleteMarkers() {
  const { map, markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(null);
    });

    this.setState({
      locations: [],
    });
  }

  componentDidUpdate(prevProps) {
    let { map, directionsDisplay, directionsService } = this.state;
    let newLocations = this.props.locations;
    let isChanged = false;

    newLocations.forEach((location, i) => {
      if(!prevProps.locations[i] || location.coordinates.lat !== prevProps.locations[i].coordinates.lat && location.coordinates.lng !== prevProps.locations[i].coordinates.lng) {
        isChanged = true;
      }
    });

    if (isChanged) {
      // Delete all markers on map
      this.deleteMarkers();
      let calculateAndDisplayRoute = this.calculateAndDisplayRoute;

      // Create an array of alphabetical characters used to label the markers.
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let newInfoWindows = {};
      var markers = [];

      newLocations.forEach((location, i) => {
        var newMarker = new google.maps.Marker({ 
          position: location.coordinates,
          label: labels[i % labels.length]
        });

        newInfoWindows[newMarker.label] = new google.maps.InfoWindow({
          content: location.title,
          map: map,
        });
      
        google.maps.event.addListener(newMarker, 'mouseover', function() {
          newInfoWindows[this.label].open(map, this);
        });
     
        google.maps.event.addListener(newMarker, 'mouseout', function() {
          newInfoWindows[this.label].close();
        });

        google.maps.event.addListener(newMarker, 'click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay, this);
        });

        markers.push(newMarker);
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers, {
      imagePath:'./googleMaps/images/',
      });

      this.setState({
        locations: newLocations,
        markers,
        infoWindows: newInfoWindows,
      });

    }
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, marker) {
    const {map, currentPosition} = this.state;
    
    let origin = new google.maps.LatLng(currentPosition.lat, currentPosition.lng);
    let destination = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

    this.props.updateDestination({
      lat : marker.position.lat(),
      lng: marker.position.lng(),
    },currentPosition);

    directionsService.route({
      origin,
      destination, 
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        console.log('OK');
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return (
        <div id="map" />
    );
  }
}

export default Map;