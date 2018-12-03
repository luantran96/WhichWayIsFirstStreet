import React, { Component } from 'react';
import { render } from 'react-dom';
import MarkerClusterer from '@google/markerclusterer';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };

  }

  componentDidMount() {

    var locations = [
      {lat: 37.691109, lng: 147.154312},
    ];

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.691109, lng: -122.472221},
      zoom: 5
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });


        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, {
          imagePath:'./googleMaps/images/',
        });
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