const express = require('express');

const router = express.Router();

const {
  addSale,
  getAllSales,
  getSale,
  updateSale,
} = require('../controllers');

router.post('/', addSale);

router.get('/', getAllSales);

router.get('/:id', getSale);

router.put('/:id', updateSale);

module.exports = router;
