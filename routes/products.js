const express = require('express');
const { productsControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.createProducts, productsControllers.addProduct);
router.get('/', productsControllers.findProducts);
router.get('/:id', check.id, productsControllers.findProduct);
router.put('/:id', check.updateProducts, productsControllers.updateProduct);
router.delete('/:id', check.id, productsControllers.deleteProduct);

module.exports = router;
