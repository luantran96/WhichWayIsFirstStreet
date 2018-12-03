import React, { Component } from 'react';
import { render } from 'react-dom';
import MarkerClusterer from '@google/markerclusterer';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.locations,
      map: undefined,
      markers: [],
      infoWindows: {},
    };

  this.deleteMarkers = this.deleteMarkers.bind(this);

  }

  componentDidMount() {
    const { locations } = this.state;

      let currentPosition = {
        lat: 37.744385,
        lng: -122.417046,
      };
          
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: currentPosition,
        zoom: 11
      });
  
      this.setState({
        map,
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
    let { map } = this.state;
    let newLocations = this.props.locations;
    let isChanged = false;

    console.log(newLocations);
    newLocations.forEach((location, i) => {
      if(!prevProps.locations[i] || location.coordinates.lat !== prevProps.locations[i].coordinates.lat && location.coordinates.lng !== prevProps.locations[i].coordinates.lng) {
        isChanged = true;
      }
    });

    if (isChanged) {
      // Delete all markers on map
      this.deleteMarkers();

      // Create an array of alphabetical characters used to label the markers.
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let newInfoWindows = {};


      // newInfoWindows[labels[i % labels.length]] = new google.maps.infoWindow({
      //   content: location.title,
      //   map: map,
      // });
      // google.maps.event.addListener(newMarker, 'click', function() {
      //   console.log(this);
      //   //infowindow.open(map, this);
      // });

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
      
      google.maps.event.addListener(newMarker, 'click', function() {
        newInfoWindows[this.label].open(map, this);
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

  render() {
    return (
      <div id="map" />
    );
  }
}

export default Map;