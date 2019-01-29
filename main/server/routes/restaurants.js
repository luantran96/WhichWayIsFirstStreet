const express = require('express');
const request = require('request');
const path = require('path');

const KEY = require('./../../react-client/src/API');
const db = require('../../database-postgres/restaurant');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../react-client/dist/dashboard.html'));
});

router.get('/selectAll', (req, res) => {
  const { userId } = req.query;

  db.findAllRestaurants(userId, (restaurants) => {
    res.json(restaurants);
  });
});

router.post('/add', (req, res) => {
  const { id, userId } = req.body;

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
      // console.log('info: ', info);
      // const hours = info.hours[0].open;
      // console.log('hours: ', hours);

      info.userId = userId;

      db.addRestaurant(info, (newRestaurant) => {
        if (newRestaurant) {
          res.json(newRestaurant);
          // db.findAllRestaurants(userId, (restaurants) => {
          // });
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

  console.log(req.query);

  // const latitude = 37.691109;
  // const longitude = -122.472221;

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

  const { id } = req.query;
  console.log(req.query);

  db.findRestaurant(id, (restaurant) => {
    res.json(restaurant);
  });

  // var options = {
  //   url:`https://api.yelp.com/v3/businesses/${id}`,
  //   headers: {
  //     'Authorization': `Bearer ${API.YELP}`,
  //   },
  // };

  // request(options, (err, response, body) => {
  //   if (!err && response.statusCode == 200) {
  //     var info = JSON.parse(body);
  //     res.json(info);
  //   } 
  // });

});

module.exports = router;
