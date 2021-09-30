const express = require('express');
const salesController = require('../controller/salesController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const salesSchema = require('../apiSchema/salesSchema');

const router = express.Router();

router.post('/', joiSchemaValidation.validateBody(salesSchema.createSalesSchema),
salesController.createSales);

router.get('/:id', salesController.getsalesById);

router.get('/', salesController.getAllSales);

module.exports = router;