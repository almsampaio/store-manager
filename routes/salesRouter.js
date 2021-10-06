const express = require('express');
const controller = require('../controller/salesController');
const { 
    validateInsertedData,
    validateID,
    validateIdOnDelete,
    validateExistenceSale,
    validateQtd,
} = require('../validations/salesValidations');

const router = express.Router();

router.post('/', validateInsertedData, validateQtd, controller.addNewSale);
router.get('/', controller.getAllSales);
router.get('/:id', validateID, controller.getSalesById);
router.put('/:id', validateInsertedData, validateIdOnDelete, validateQtd, controller.updateSale);
router.delete('/:id', validateIdOnDelete, validateExistenceSale, controller.deleteSale);

module.exports = router;