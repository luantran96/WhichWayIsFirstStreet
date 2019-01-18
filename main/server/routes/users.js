const express = require('express');
const path = require('path');
const db = require('./../../database-postgres/user');

const router = express.Router();


router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../react-client/dist/login.html'));
});

router.post('/login', (req, res) => {

  console.log(req.body);

  const { email, password } = req.body;
  db.checkUser({
    email,
    password,
  }, (found) => {

    console.log('Is user found: ', found);
    if (found) {
      // move to dashboard

      res.redirect('/');
    } else {
      res.sendFile(path.join(__dirname, '/../../react-client/dist/login.html'));
    }
  });
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../react-client/dist/register.html'));
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  console.log('IM HERE');

  db.addUser({
    email,
    password,
  }, (created) => {
    console.log('created: ', created);
    res.sendFile(path.join(__dirname, '/../../react-client/dist/login.html'));
  });
});

module.exports = router;
