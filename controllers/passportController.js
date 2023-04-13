const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userModel');

exports.strategy = new LocalStrategy({
  usernameField: 'email'
},
async function (email, password, done) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { feedback: 'Incorrect email.' });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return done(null, false, { feedback: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

exports.serializeUser = function (user, done) {
  done(null, user.id);
  console.log('User logged out');
};

exports.deserializeUser = function (user, done) {
  done(null, false);
  console.log('User logged in');
};
