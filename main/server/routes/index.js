const express = require('express');
const path = require('path');

const router = express.Router();

// Get homepage
router.get('/', (req, res) => {
  // res.redirect('/users/login');
  res.sendFile(path.join(__dirname, './../../react-client/dist/dashboard.html'));
});

module.exports = router;
