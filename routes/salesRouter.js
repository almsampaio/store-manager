const express = require('express');
const controller = require('../controller/salesController');
const { validateInsertedData, validateID } = require('../validations/salesValidations');

const router = express.Router();

router.post('/', validateInsertedData, controller.addNewSale);
router.get('/', controller.getAllSales);
router.get('/:id', validateID, controller.getSalesById);
router.post('/:id', controller.updateSale);

module.exports = router;