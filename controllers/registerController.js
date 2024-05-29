const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    console.log(user.name + ' Succesfully added');
    res.redirect('/users/login');
  } catch (error) {
    console.log(error);
    res.redirect('/users/register');
  }
};
