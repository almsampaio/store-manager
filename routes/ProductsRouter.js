const { Router } = require('express');
const ProductsController = require('../controller/products/ProductsController');

const productRoutes = Router();

productRoutes.post('/products', ProductsController.createProductController);
productRoutes.get('/products', ProductsController.getAllProductsController);
// productRoutes.get('/products', ProductsController.getProductByIdController);

module.exports = productRoutes;