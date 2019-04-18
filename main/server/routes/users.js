const express = require('express');
const path = require('path');
const db = require('./../../database-postgres/user');

const router = express.Router();


router.get('/login', (req, res) => {

  const { email, password } = req.query;
  db.checkUser({
    email,
    password,
  }, (user, found) => {
    res.status(200).json(user);

    // res.json(user, found);

    // console.log('Is user found: ', found);
    // if (found) {
    //   // move to dashboard

    //   res.redirect('/');
    // } else {
    //   res.sendFile(path.join(__dirname, '/../../react-client/dist/login.html'));
    // }
  });
});

// router.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../../react-client/dist/register.html'));
// });

router.get('/register', (req, res) => {
  const { email, password } = req.query;

  console.log('IM HERE');

  db.addUser({
    email,
    password,
  }, (user) => {
    res.status(200).json(user);
  });
});

module.exports = router;
