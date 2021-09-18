const express = require('express');

const router = express.Router();

const { 
  getAllSales,
  getById,
  validateQuantitySales,
  create,
} = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getById);

router.post('/', validateQuantitySales, create);

module.exports = router;
