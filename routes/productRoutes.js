const express = require('express');
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');

const router = express.Router();

router.post('/', 
  joiSchemaValidation.validateBody(productSchema.createProductSchema), 
  productController.createProduct);

module.exports = router;
