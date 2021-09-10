const { Router } = require('express');
const createProductController = require('../controller/products/ProductsController');

const productRoutes = Router();

productRoutes.post('/products', createProductController);

module.exports = productRoutes;