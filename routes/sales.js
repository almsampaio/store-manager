const express = require('express');
const rescue = require('express-rescue');
const { salesControllers } = require('../controllers');
const { middlewaresServices } = require('../middlewares');

const router = express.Router();

router.post('/', middlewaresServices.quantitySales, rescue(salesControllers.addSales));
router.get('/', rescue(salesControllers.findSales));
router.get('/:id', middlewaresServices.checkIdSales, rescue(salesControllers.findSale));
router.put('/:id', middlewaresServices.quantitySales, rescue(salesControllers.updateSale));
router.delete('/:id', middlewaresServices.checkIdDelete, rescue(salesControllers.deleteSale));

module.exports = router;
