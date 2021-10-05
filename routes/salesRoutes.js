const express = require('express');
const salesController = require('../controllers/salesController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const salesSchema = require('../apiSchema/salesSchema');

const router = express.Router();

router.post('/', joiSchemaValidation.validateBody(salesSchema.createSalesSchema),
  salesController.createSales);

router.get('/:id', salesController.getSalesById);

router.put('/:id', joiSchemaValidation.validateBody(salesSchema.updateSalesSchema),
  salesController.updateSales);

router.get('/', salesController.getAllSales);

router.delete('/:id', salesController.deleteSales);

module.exports = router;
