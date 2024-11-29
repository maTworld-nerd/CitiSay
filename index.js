// index.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const simulationRoutes = require('./routes/simulationRoute');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/user', userRoutes);
app.use('/simulate', simulationRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
