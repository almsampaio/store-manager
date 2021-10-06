const express = require('express');
const controller = require('../controllers/productsController');
const {
    validateInsertedQtd,
    validateInsertedName,
    validateObjectID,
    validateExistence,
 } = require('../validations/productsValidations');

const router = express.Router();

router.post('/', validateInsertedName,
validateInsertedQtd, validateExistence, controller.addNewProduct);
router.get('/', controller.getAllProducts);
router.get('/:id', validateObjectID, controller.getById);
router.put('/:id', validateInsertedName, validateInsertedQtd, controller.updateProduct);
router.delete('/:id', validateObjectID, controller.deleteProduct);

module.exports = router;
