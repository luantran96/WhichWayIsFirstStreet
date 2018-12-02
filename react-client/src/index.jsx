import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import Map from './components/Map.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: []
    }
  }

  componentDidMount() {

  }
  

  render () {
    return (  
  <div id="body">
    <div id="nav-bar">
      <Nav />
    </div>
    <div id="main">
      <div id="left">
        <Map />
      </div>
      <div id="right">
      
      </div>
    </div>
  </div>
    );
  }


}


ReactDOM.render(<App />, document.getElementById('app'));