// controllers/simulationController.js
const db = require('../models/db');

// Advanced policy simulation considering inflation, GDP growth, and spending effects
const simulateAdvancedPolicy = (taxRate, spending, inflationRate, gdpGrowth) => {
  // Basic effect of tax rate on economic growth
  let economicGrowth = (100 - taxRate) * 0.2;

  // Adjust economic growth based on inflation and GDP growth
  economicGrowth += gdpGrowth * 0.5 - inflationRate * 0.3;

  // Unemployment and spending effects
  const unemploymentRate = (taxRate + spending / 100) * 0.05 + inflationRate * 0.1;
  const spendingImpact = spending * 0.03 + inflationRate * 0.02;

  return { economicGrowth, unemploymentRate, spendingImpact };
};

// Simulation endpoint
const simulatePolicy = (req, res) => {
  const { taxRate, spending, inflationRate, gdpGrowth } = req.body;
  
  const result = simulateAdvancedPolicy(taxRate, spending, inflationRate, gdpGrowth);

  // Save the result to the database
  const query = "INSERT INTO simulations (taxRate, spending, economicGrowth, unemploymentRate, spendingImpact, inflationRate, gdpGrowth) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [taxRate, spending, result.economicGrowth, result.unemploymentRate, result.spendingImpact, inflationRate, gdpGrowth], (err, result) => {
    if (err) throw err;
    console.log("Simulation saved to database.");
  });

  // Send the results back to the frontend
  res.json(result);
};

module.exports = { simulatePolicy };
