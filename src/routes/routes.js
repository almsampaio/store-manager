const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const SaleController = require('../controllers/SaleController');

const routes = Router();

routes.get('/products', ProductController.listAll);
routes.get('/products/:id', ProductController.findById);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.remove);

routes.get('/sales', SaleController.listAll);
routes.get('/sales/:id', SaleController.findById);
routes.post('/sales', SaleController.create);
routes.put('/sales/:id', SaleController.update);

module.exports = routes;
