// const express = require('express');
// const request = require('request');
// const path = require('path');

// const KEY = require('./../../react-client/src/API');
// const db = require('../../database-postgres/restaurant');
// const dishDB = require('../../database-postgres/dish');

import express from 'express';
import request from 'request';
import path from 'path';
import * as KEY from '../../API';
import * as restaurant from '../../../db/restaurant';
import * as dish from '../../../db/dish';

// import KEY from '../../'

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../react-client/dist/dashboard.html'));
});

router.get('/selectAll', (req, res) => {
  const { userId } = req.query;

  restaurant.findAllRestaurants(userId, restaurants => {
    res.json(restaurants);
  });
});

router.post('/add', (req, res) => {
  const { id, userId } = req.body;

  console.log('id: ', req.body);
  const options = {
    url: `https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      Authorization: `Bearer ${KEY.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const info = JSON.parse(body);

      info.userId = userId;

      restaurant.addRestaurant(info, newRestaurant => {
        if (newRestaurant) {
          res.json(newRestaurant);
        } else {
          res.end();
        }
      });
    }
  });
});

router.get('/search', (req, res) => {
  let { name, lat, lng } = req.query;

  lat = lat || 37.691109;
  lng = lng || -122.472221;

  const options = {
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${lat}&longitude=${lng}`,
    headers: {
      Authorization: `Bearer ${KEY.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const info = JSON.parse(body);
      console.log('info: ', info);
      res.json(info);
    }
  });
});

router.get('/getInfo', (req, res) => {
  const { id, userId } = req.query;

  restaurant.findRestaurant(id, restaurant => {
    dish.findAllDishes(userId, id, dishes => {
      console.log('dishes: ', dishes);
      let copy = Object.assign({}, restaurant);
      copy.dishes = dishes;

      res.json(copy);
    });
  });
});

router.delete('/delete', (req, res) => {
  const { userId, yelpId } = req.query;
  console.log(req.query);

  restaurant.removeRestaurant(userId, yelpId, numDelete => {
    console.log('numDelete: ', numDelete);
    res.json(yelpId);
  });
});

/**
 * @param {string} s
 * @return {string}
 */

router.post('/addNotes', (req, res) => {
  const { yelpId, userId, dishName, dishNotes, dishRating } = req.body;

  console.log(req.body);

  dish.addDish(req.body, () => {
    restaurant.findRestaurant(yelpId, restaurant => {
      dish.findAllDishes(userId, yelpId, dishes => {
        console.log('dishes: ', dishes);
        let copy = Object.assign({}, restaurant);
        copy.dishes = dishes;

        res.json(copy);
      });
    });
  });
});

export default router;
