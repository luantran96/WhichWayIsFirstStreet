import React from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem.jsx';
import PropTypes from 'prop-types';


const List = ({restaurants, handleRestaurantListItemClick, handleButtonClick, showDetails}) => (

  <div>
    <nav className= "navbar navbar-expand-md navbar-dark bg-dark shadow mb-3 rounded">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      </button>

     <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter by</a>
          <div className="dropdown-menu" aria-labelledby="dropdown01">
            <a className="dropdown-item" href="#">Ratings</a>
            <a className="dropdown-item" href="#">Distance</a>
            <a className="dropdown-item" href="#">most reviewed</a>
          </div>
        </li>
      </ul>
     </div>
    </nav>

      <div>
      {restaurants.map(restaurant => 
        <ListItem 
        restaurant={restaurant} 
        handleRestaurantListItemClick={handleRestaurantListItemClick}
        handleButtonClick={handleButtonClick} 
        showDetails={showDetails}
        />)
      }
      </div>
  </div>
);

let mapStateToProps = (state) => {
    return {
        restaurants: state.app.restaurants,
    }
};

List.contextTypes = {
    store: PropTypes.object
}
const wrappedList = connect(mapStateToProps)(List);

export default wrappedList;

