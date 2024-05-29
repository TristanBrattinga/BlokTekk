const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.removeUser = async (req, res) => {
  const sessionId = req.session.id;
  console.log(sessionId);
  try {
    const user = await User.findById({ });
    if (!user) {
      console.log('User not found.');
      res.send('User not found');
    } else {
      await User.remove();
      console.log('User deleted successfully!');
      res.redirect('/register');
    }
  } catch (err) {
    console.log(err);
  }
};
