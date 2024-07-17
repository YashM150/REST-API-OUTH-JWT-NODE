// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=  require('../models/userModel');

const generateToken = (email) => {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '6h' });
};

//Registration of user in login table 
exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email|| !password) {
    return res.status(400).send('All fields are required!!');
  }
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password.');
    }
    console.log(`email :${email}`);
    console.log(`password :${password}`);
    User.Jcreate({ email:email, password: hashedPassword }, (err, result) => {
      if (err) {
        return res.status(500).send('Error creating user in login table!');
      }
      res.status(201).send('User registered!!');
    });
  });
};

//Login of user through email and password
exports.login = async (req, res) => {
  const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).send('Error finding user');
      }
      if (results.length === 0) {
        return res.status(404).send('User not found');
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing passwords');
        }
        if (!isMatch) {
          return res.status(401).send('Invalid credentials');
        }
        
        const token = generateToken(user.email);
        console.log(token);
        res.status(200).json({ token });
      });
    });
};


exports.oauthCallback = (req, res) => {
  const email = req.user.email;
  const token = generateToken({ email });
  console.log(token);
  res.redirect(` http://localhost:3000`); 
};
