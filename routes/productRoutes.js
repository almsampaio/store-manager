const express = require('express');
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');

const router = express.Router();

router.post('/', 
  joiSchemaValidation.validateBody(productSchema.createProductSchema), 
  productController.createProduct);

router.get('/', productController.getAllProducts);

module.exports = router;
