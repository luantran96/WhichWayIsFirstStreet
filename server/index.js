var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var API = require('./../react-client/src/API.js');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
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

app.post('/add', (req, res) => {
  const {result} = req.body;
  items.Add(result, (item) => {
    
    console.log('item added: ', item);
    res.end('OK');
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

app.get('/deleteAll', (req, res) => {
  items.deleteAll(() => {
    res.end();
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

