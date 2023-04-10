const express = require('express');
const router = express.Router();
const { User } = require('./models/userModel');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const User = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      password2: hashedPassword,
      mood: req.body.moods
    });
    await User.save();
    console.log(User.firstName + ' Succesfully added');
    res.redirect('/register/login');
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
});

module.exports = router;
