const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controller = require('../controllers');

router.post('/', rescue(controller.productsController.createProduct));
router.get('/', rescue(controller.productsController.getAllProducts));
router.get('/:id', rescue(controller.productsController.getProductById));
router.put('/:id', rescue(controller.productsController.editProduct));

module.exports = router;
