const express = require('express');
const controller = require('../controller/salesController');
const { validateInsertedData } = require('../validations/salesValidations');

const router = express.Router();

router.post('/', validateInsertedData, controller.addNewSale);
router.get('/', controller.getAllSales);

module.exports = router;