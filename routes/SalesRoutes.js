const express = require('express');

const router = express.Router();

const {
  addSale,
  getAllSales,
  getSale,
} = require('../controllers');

router.post('/', addSale);

router.get('/', getAllSales);

router.get('/:id', getSale);

module.exports = router;
