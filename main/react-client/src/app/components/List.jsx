import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem.jsx';
import PropTypes from 'prop-types';


const List = ({ restaurants, handleRestaurantListItemClick, handleButtonClick, showDetails, price, filterBy }) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow mb-3 rounded">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation" />

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter by</span>
            <div className="dropdown-menu" aria-labelledby="dropdown01">
              <span
                className="dropdown-item"
                onClick={() => filterBy('ratings')}>
                Rating
                </span>
              <span
                className="dropdown-item"
                onClick={() => filterBy('distance')}>
                Distance
                </span>
              <span
                className="dropdown-item"
                onClick={() => filterBy('reviews')}>
                most reviews
                </span>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div>
      {restaurants.map((restaurant, idx) => (
        <ListItem
          restaurant={restaurant}
          handleRestaurantListItemClick={handleRestaurantListItemClick}
          price={price}
          handleButtonClick={handleButtonClick}
          showDetails={showDetails}
          idx={idx}
        />
      ))
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  restaurants: state.app.restaurants,
  price: state.nav.price,
}
);

const mapDispatchToProps = dispatch => ({
  filterBy: type => dispatch({
    type: 'FILTER_BY',
    payload: type,
  }),
}
);

List.contextTypes = {
  store: PropTypes.instanceOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(List);


