import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import ListItem from './ListItem.jsx';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            restaurants: this.props.restaurants,
        }

        this.renderItems = this.renderItems.bind(this);
      }

    renderItems() {
        let { restaurants } = this.state;
        console.log('restaurants in List: ', restaurants);
        let items = restaurants.map((restaurant) => {
            return <ListItem restaurant={restaurant}/>;
            // return restaurant.title;
        });

        return items;
    }

    render() {

        return (
            <div id="list">
                {this.renderItems()}
            </div>
        );
    }
}

export default List;

