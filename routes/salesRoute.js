const express = require('express');

const router = express.Router();

const { 
  getAllSales,
  getById,
  validateQuantitySales,
  create,
  updateSale,
} = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getById);

router.post('/', validateQuantitySales, create);

router.put('/:id', validateQuantitySales, updateSale);

module.exports = router;
