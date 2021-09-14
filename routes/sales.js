const express = require('express');
const { salesControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.registerSales, salesControllers.registerSales);
router.get('/', salesControllers.getSales);
router.get('/:id', check.idSales, salesControllers.getOneSale);

module.exports = router;
