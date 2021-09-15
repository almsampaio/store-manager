const express = require('express');

const router = express.Router();

const {
  addSale,
  getAllSales,
  getSale,
  updateSale,
  deleteSale,
} = require('../controllers');

router.post('/', addSale);

router.get('/', getAllSales);

router.get('/:id', getSale);

router.put('/:id', updateSale);

router.delete('/:id', deleteSale);

module.exports = router;
