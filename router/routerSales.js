const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.additionalSales);
router.get('/', Controller.sales.getSales);
router.get('/:id', Controller.sales.getSaleById);
router.put('/:id', Controller.sales.saleUpdated);
router.delete('/:id', Controller.sales.saleDeleted);

module.exports = router;