const rescue = require('express-rescue');
const { getSales } = require('../models/SalesModel');

module.exports = rescue(async (_req, res) => {
  const sales = await getSales();
  res.status(200).json({ sales });
});
