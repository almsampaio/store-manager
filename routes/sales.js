const express = require('express');
const { salesControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.quantitySales, salesControllers.registerSales);
router.get('/', salesControllers.getSales);
router.get('/:id', check.idSales, salesControllers.getOneSale);
router.put('/:id', check.quantitySales, salesControllers.updateSale);

module.exports = router;
