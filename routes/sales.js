const express = require('express');
const { salesControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.quantitySales, salesControllers.addSales);
router.get('/', salesControllers.findSales);
router.get('/:id', check.idSales, salesControllers.findSale);
router.put('/:id', check.quantitySales, salesControllers.updateSale);
router.delete('/:id', salesControllers.deleteSale);

module.exports = router;
