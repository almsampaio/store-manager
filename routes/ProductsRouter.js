const { Router } = require('express');
const ProductsController = require('../controller/products/ProductsController');

const productRoutes = Router();

productRoutes.post('/products', ProductsController.createProductController);
productRoutes.get('/products', ProductsController.getAllProductsController);
productRoutes.get('/products/:id', ProductsController.getProductByIdController);
productRoutes.put('/products/:id', ProductsController.updateProductController);
productRoutes.delete('/products/:id', ProductsController.deleteProductController);

module.exports = productRoutes;