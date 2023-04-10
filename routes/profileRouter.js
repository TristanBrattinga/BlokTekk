const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Profile', {
    title: 'Profile'
  });
});

module.exports = router;
