const express = require('express');

const router = express.Router();

const ProductsControllers = require('../controllers/ProductsControllers');
const newProductValidate = require('../middlewares/productValidate');

router.post('/', newProductValidate, ProductsControllers.create);
router.get('/', ProductsControllers.getAllProducts);
router.get('/:id', ProductsControllers.findById);
// router.put('/:id', ProductsControllers.updateOne);
// router.delete('/:id', ProductsControllers.deleteProduct);

module.exports = router;
