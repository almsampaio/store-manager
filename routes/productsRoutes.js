const express = require('express');
const controller = require('../controller/productsController');
const {
    validateInsertedQtd,
    validateInsertedName,
    validateObjectID,
 } = require('../validations/products');

const router = express.Router();

router.post('/', validateInsertedName, validateInsertedQtd, controller.addNewProduct);
router.get('/', controller.getAllProducts);
router.get('/:id', validateObjectID, controller.getById);
router.post('/:id', controller.updateProduct);

module.exports = router;