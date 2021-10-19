const express = require('express');
const rescue = require('express-rescue');
const { productsControllers } = require('../controllers');
const { middlewaresProducts } = require('../middlewares');

const router = express.Router();

router.post('/', middlewaresProducts.createProducts, rescue(productsControllers.addProduct));
router.get('/', rescue(productsControllers.findProducts));
router.get('/:id', middlewaresProducts.checkId, rescue(productsControllers.findProduct));
router.put('/:id', middlewaresProducts.updateProducts, rescue(productsControllers.updateProduct));
router.delete('/:id', middlewaresProducts.checkId, rescue(productsControllers.deleteProduct));

module.exports = router;
