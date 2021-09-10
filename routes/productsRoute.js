const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', productsController.getProductById);
router.get('/', productsController.getAllProducts);
router.post('/', productsController.createProduct);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;
