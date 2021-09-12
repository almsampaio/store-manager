const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controller = require('../controllers');

router.post('/', rescue(controller.salesController.createSales));
router.get('/', rescue(controller.salesController.getAllSales));
router.get('/:id', rescue(controller.salesController.getSalesById));
router.put('/:id', rescue(controller.salesController.updateSales));
router.delete('/:id', rescue(controller.salesController.deleteSales));

module.exports = router;
