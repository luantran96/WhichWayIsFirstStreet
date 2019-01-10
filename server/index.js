var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var https = require('https');
var fs = require('fs');
var path = require('path');
var API = require('./../react-client/src/API.js');


var items = require('../database-mongo');

var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(cors());
app.use(bodyParser.json());

app.get('/selectAll', (req, res) => {
  items.selectAll((err, items) => {
    res.json(items);
  });
});

app.get('/getInfo', (req, res) => {

  const { id } = req.query;
  console.log(req.query);

  var options = {
    url:`https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    } 
  });
  
});

app.get('/getHours', (req, res) => {

  const { id } = req.query;
  console.log(req.query);

  var options = {
    url:`https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info.hours[0].open[new Date().getDay()]);
    } 
  });

});

app.post('/add', (req, res) => {
  const {result, id} = req.body;

  var options = {
    url:`https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      let hours = info.hours[0].open[new Date().getDay()];
      result.hours = hours;
      items.Add(result, (item) => { 
        console.log('item added: ', item);
        items.selectAll((err, items) => {
          res.json(items);
        });
      });
    } 
  });

});
 
app.get('/search', (req, res) => {
  const { name } = req.query;
  const latitude = 37.691109;
  const longitude = -122.472221;

  var options = {
    url:`https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${latitude}&longitude=${longitude}`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    } 
  });

});

app.delete('/delete', (req, res) => {
    const { _id } = req.query;
    items.deleteOne(_id, (item) => {
      res.end();
    });
});

app.get('/getRoutes', (req, res) => {

  const { start_lat, start_lng, end_lat, end_lng } = req.query;

  const origin = {
    lat: start_lat,
    lng: start_lng,
  }

  const destination = {
    lat: end_lat,
    lng: end_lng,
  }

  var options = {
    url:`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${API.GOOGLE}`,
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info.routes);
    } 
  });
});

app.get('/reviews', (req, res) => {

  const { id } = req.query;

  var options = {
    url:`https://api.yelp.com/v3/businesses/${id}/reviews`,
    headers: {
      'Authorization': `Bearer ${API.YELP}`,
    },
  };

  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    } 
  });
});

app.get('/deleteAll', (req, res) => {
  items.deleteAll(() => {
    res.end();
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

