const express = require('express');
const rescue = require('express-rescue');
const validateSale = require('../middlewares/validateSale');

const Sales = require('../services/Sales');

const router = express.Router();

router.post('/', validateSale, rescue(async (req, res) => {
  const itensSold = req.body;

  const sale = await Sales.registerSale(itensSold);
  res.status(200).json(sale);
}));

module.exports = router;
