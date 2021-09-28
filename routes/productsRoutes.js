const express = require('express');
const controller = require('../controller/productsController');
const { validateInsertedQtd, validateInsertedName } = require('../validations/products');

const router = express.Router();

router.post('/', validateInsertedName, validateInsertedQtd, controller.addNewProduct);
router.get('/', controller.getAllProducts);

module.exports = router;