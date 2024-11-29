// routes/simulationRoutes.js
const express = require('express');
const { simulatePolicy } = require('../controllers/simulationController');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).send('Invalid Token');
    req.user = decoded;
    next();
  });
};

// Simulation route with authentication
router.post('/advanced', authenticate, simulatePolicy);

module.exports = router;
