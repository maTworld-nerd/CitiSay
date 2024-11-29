// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Register a new user
const registerUser = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');
    
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).send('Database error');
      res.status(201).send('User registered successfully');
    });
  });
};

// Login user
const loginUser = (req, res) => {
  const { username, password } = req.body;
  
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err || result.length === 0) return res.status(401).send('User not found');

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).send('Invalid credentials');
      
      // Generate JWT token
      const token = jwt.sign({ userId: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

module.exports = { registerUser, loginUser };
