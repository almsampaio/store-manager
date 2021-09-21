const express = require('express');
const { createSales, getAllSales, getSaleById,
  setSale, deleteProduct } = require('../controllers/Sales');

const router = express.Router();

router.post('/', createSales);

router.get('/', getAllSales);

router.get('/:id', getSaleById);

router.put('/:id', setSale);

router.delete('/:id', deleteProduct);

module.exports = router;
