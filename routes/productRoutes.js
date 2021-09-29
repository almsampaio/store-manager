const express = require('express');
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');

const router = express.Router();

router.post('/', 
  joiSchemaValidation.validateBody(productSchema.createProductSchema), 
  productController.createProduct);

router.get('/:id', productController.getProductById);

router.put('/:id', joiSchemaValidation.validateBody(productSchema.updateProductSchema),
  productController.updateProduct);

router.get('/', productController.getAllProducts);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
