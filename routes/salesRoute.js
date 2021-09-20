const express = require('express');

const router = express.Router();

const { 
  getAllSales,
  getById,
  validateQuantitySales,
  create,
  updateSale,
  validateId,
  deleteSales,
} = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getById);

router.post('/', validateQuantitySales, create);

router.put('/:id', validateQuantitySales, updateSale);

router.delete('/:id', validateId, deleteSales);

module.exports = router;
