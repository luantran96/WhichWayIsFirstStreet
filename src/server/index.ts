// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const path = require('path');
// const flash = require('connect-flash');
// const routes = require('/routes/index');
// const users = require('/routes/users');
// const restaurants = require('./routes/restaurants');

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import users from './routes/users';
import restaurants from './routes/restaurants';
import routes from './routes/index';


const PORT = process.env.PORT || 3000;

// Init App
const app = express();

// Setup cors headers
app.use(cors());

app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Parse queries into body
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

// Log requests to console
app.use(morgan('tiny'));

// Setup routes
app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/', routes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}!`);
});


