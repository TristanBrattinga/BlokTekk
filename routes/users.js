const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');

const registerController = require('../controllers/registerController');
const logController = require('../controllers/logController');
const passportController = require('../controllers/passportController');
const removeController = require('../controllers/removeController');

/**========================================================================
 *                           All users Page
*========================================================================**/
router.get('/', async (req, res) => {
  // eslint-disable-next-line prefer-const
  let searchOptions = [];
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const users = await User.find({ searchOptions });
    console.log(users);
    res.render('users/index', {
      users,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

/**========================================================================
 *                           Register Page
*========================================================================**/

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', registerController.registerUser);

/**========================================================================
 *                           Login Page
*========================================================================**/

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', logController.loginUser);

/**========================================================================
 *                             Account Page
*========================================================================**/

router.get('/profile', (req, res) => {
  res.render('users/profile');
});

/**========================================================================
 *                         Passport Authentication
*========================================================================**/

passport.use(passportController.strategy);

passport.serializeUser(passportController.serializeUser);

passport.deserializeUser(passportController.deserializeUser);

/**========================================================================
 *                           Logout Route
 *========================================================================**/

router.post('/logout', logController.logoutUser);

/**========================================================================
 *                           Remove Route
 *========================================================================**/

router.post('/remove', removeController.removeUser);

/**========================================================================
 *                       Authentication Middleware
 *========================================================================**/

//! Is nog niet van nut omdat user authenticated blijft
// function checkAuthenticated (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/register/login');
// };

// function checkNotAuthenticated (req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/register/account');
//   }
//   next();
// };

module.exports = router;
