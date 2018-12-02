import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import KEY from '../API.js';



class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
      }

    render() {

        return (
          <div>
            <div>
              <Search
              id="search"
              placeholder="Search"
              />
            </div>
        </div>
        );
    }
}

export default Nav;