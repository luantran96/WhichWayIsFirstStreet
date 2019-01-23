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
  db.findAllRestaurants((restaurants) => {
    res.json(restaurants);
  });
});

router.post('/add', (req, res) => {
  const { id } = req.body;
  
  console.log('id: ', id);
  const options = {
    url:`https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${KEY.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const info = JSON.parse(body);
      console.log('info: ', info);
      // const hours = info.hours[0].open;
      // console.log('hours: ', hours);

      db.addRestaurant(info, (created) => {
        if (created) {
          db.findAllRestaurants((restaurants) => {
            res.json(restaurants);
          });
        } else {
          res.end();
        }
      });
    }
  });
});

router.get('/search', (req, res) => {
  const { name } = req.query;
  const latitude = 37.691109;
  const longitude = -122.472221;

  const options = {
    url: `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${latitude}&longitude=${longitude}`,
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

module.exports = router;
