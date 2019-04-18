const express = require('express');
const request = require('request');
const path = require('path');

const KEY = require('./../../react-client/src/API');
const db = require('../../database-postgres/restaurant');
const dishDB = require('../../database-postgres/dish');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../react-client/dist/dashboard.html'));
});

router.get('/selectAll', (req, res) => {
  const {
    userId
  } = req.query;

  db.findAllRestaurants(userId, (restaurants) => {
    res.json(restaurants);
  });
});

router.post('/add', (req, res) => {
  const {
    id,
    userId
  } = req.body;

  console.log('id: ', req.body);
  const options = {
    url: `https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${KEY.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const info = JSON.parse(body);

      info.userId = userId;

      db.addRestaurant(info, (newRestaurant) => {
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
  let {
    name,
    lat,
    lng
  } = req.query;

  lat = lat || 37.691109;
  lng = lng || -122.472221;

  const options = {
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${lat}&longitude=${lng}`,
    headers: {
      'Authorization': `Bearer ${KEY.YELP}`,
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
  const {
    id,
    userId
  } = req.query;

  db.findRestaurant(id, restaurant => {

    dishDB.findAllDishes(userId, id, (dishes) => {

      console.log('dishes: ', dishes);
      let copy = Object.assign({}, restaurant);
      copy.dishes = dishes;

      res.json(copy);

    });

  });
});

router.delete('/delete', (req, res) => {
  const {
    userId,
    yelpId
  } = req.query;
  console.log(req.query);

  db.removeRestaurant(userId, yelpId, numDelete => {
    console.log('numDelete: ', numDelete);
    res.json(yelpId);
  });
});

/**
 * @param {string} s
 * @return {string}
 */

router.post('/addNotes', (req, res) => {
  const {
    yelpId,
    userId,
    dishName,
    dishNotes,
    dishRating
  } = req.body;

  console.log(req.body);

  dishDB.addDish(req.body, () => {
    db.findRestaurant(yelpId, restaurant => {

      dishDB.findAllDishes(userId, yelpId, dishes => {

        console.log('dishes: ', dishes);
        let copy = Object.assign({}, restaurant);
        copy.dishes = dishes;

        res.json(copy);

      });

    });
  });
});

module.exports = router;