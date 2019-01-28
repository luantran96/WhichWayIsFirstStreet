const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const validator = require('express-validator');
const morgan = require('morgan');
const path = require('path');
// const API = require('./../react-client/src/API.js');
const flash = require('connect-flash');
const routes = require('./routes/index');
const users = require('./routes/users');
const restaurants = require('./routes/restaurants');

const PORT = process.env.PORT || 3000;

// Init App
const app = express();

// Setup cors headers
app.use(cors());

// Set static folder
app.use('/users', express.static(path.join(__dirname, '/../react-client/dist')));
app.use(express.static(path.join(__dirname, '/../react-client/dist')));


// Parse queries into body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to console
app.use(morgan('tiny'));

// Setup session
app.use(session({
  secret: 'secret eaten',
  saveUninitialized: true,
  resave: true,
}));

// Setup flash
app.use(flash());

// Setup routes
app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});


// app.get('/', (req, res) => {
//   // res.redirect('/login');
//   res.sendFile(path.join(__dirname, '/../react-client/dist/dashboard.html'));
// })

// app.get('/selectAll', (req, res) => {
//   items.selectAll((err, items) => {
//     res.json(items);
//   });
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../react-client/dist/login.html'));
// });

// app.get('api/findUser', (req, res) => {
  
// });


// app.get('/getInfo', (req, res) => {

//   const { id } = req.query;
//   console.log(req.query);

//   var options = {
//     url:`https://api.yelp.com/v3/businesses/${id}`,
//     headers: {
//       'Authorization': `Bearer ${API.YELP}`,
//     },
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       res.json(info);
//     } 
//   });
  
// });

// app.get('/getHours', (req, res) => {

//   const { id } = req.query;
//   console.log(req.query);

//   var options = {
//     url:`https://api.yelp.com/v3/businesses/${id}`,
//     headers: {
//       'Authorization': `Bearer ${API.YELP}`,
//     },
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       res.json(info.hours[0].open[new Date().getDay()]);
//     } 
//   });

// });

// app.post('api/restaurant/add', (req, res) => {
//   const { result, id } = req.body;

//   var options = {
//     url:`https://api.yelp.com/v3/businesses/${id}`,
//     headers: {
//       'Authorization': `Bearer ${API.YELP}`,
//     },
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       console.log('info: ', info);
//       let hours = info.hours[0].open;
//       console.log('hours: ', hours);
//       // info.hours = hours;
//       items.Add(info, (item) => { 
//         console.log('item added: ', item);
//         items.selectAll((err, items) => {
//           res.json(items);
//         });
//       });
//     } 
//   });
// });

// app.post('/login', (req, res) => {

// });
 
// app.get('/search', (req, res) => {
//   const { name } = req.query;
//   const latitude = 37.691109;
//   const longitude = -122.472221;

//   var options = {
//     url:`https://api.yelp.com/v3/businesses/search?term=${name}&latitude=${latitude}&longitude=${longitude}`,
//     headers: {
//       'Authorization': `Bearer ${API.YELP}`,
//     },
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       res.json(info);
//     } 
//   });

// });

// app.delete('/delete', (req, res) => {
//     const { _id } = req.query;
//     items.deleteOne(_id, (item) => {
//       items.selectAll((err, items) => {
//         res.json(items);
//       });
//     });
// });

// app.get('/getRoutes', (req, res) => {

//   const { start_lat, start_lng, end_lat, end_lng } = req.query;

//   const origin = {
//     lat: start_lat,
//     lng: start_lng,
//   }

//   const destination = {
//     lat: end_lat,
//     lng: end_lng,
//   }

//   var options = {
//     url:`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${API.GOOGLE}`,
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       res.json(info.routes);
//     } 
//   });
// });

// app.get('/reviews', (req, res) => {

//   const { id } = req.query;

//   var options = {
//     url:`https://api.yelp.com/v3/businesses/${id}/reviews`,
//     headers: {
//       'Authorization': `Bearer ${API.YELP}`,
//     },
//   };

//   request(options, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       var info = JSON.parse(body);
//       res.json(info);
//     } 
//   });
// });

// app.get('/deleteAll', (req, res) => {
//   items.deleteAll(() => {
//     res.end();
//   });
// });




