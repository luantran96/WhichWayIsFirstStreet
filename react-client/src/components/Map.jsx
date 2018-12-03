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

    newLocations.forEach((location, i) => {
      if(!prevProps.locations[i] || location.lat !== prevProps.locations[i].lat && location.lng !== prevProps.locations[i].lng) {
        isChanged = true;
      }
    });

    if (isChanged) {

      // Delete all markers on map
      this.deleteMarkers();

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        var markers = newLocations.map(function(location, i) {
          return new google.maps.Marker({ 
            position: location,
            label: labels[i % labels.length]
          });
        });

         // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, {
        imagePath:'./googleMaps/images/',
        });


        this.setState({
          locations: newLocations,
          markers,
        });

      }
  }

  handleClick() {
    window.google.maps.event.trigger(map, 'resize');
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default Map;