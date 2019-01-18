const express = require('express');
const request = require('request');
const path = require('path');
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

router.get('/add', (req, res) => {
  const { result, id } = req.body;

  const options = {
    url:`https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const info = JSON.parse(body);
      console.log('info: ', info);
      const hours = info.hours[0].open;
      console.log('hours: ', hours);

      db.addRestaurant(info, () => {
        db.findAllRestaurants((restaurants) => {
          res.json(restaurants);
        });
      });
    }
  });
});

module.exports = router;
