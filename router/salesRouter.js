const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.addSales);
router.get('/', Controller.sales.getSales);

router.get('/:id', Controller.sales.getSaleById);
router.put('/:id', Controller.sales.updateSale);
router.delete('/:id', Controller.sales.deleteSale);

module.exports = router;