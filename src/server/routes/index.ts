const express = require('express');
const path = require('path');

const router = express.Router();

// Get homepage
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/app.html'));
});

export default router;
