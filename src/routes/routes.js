const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const SaleController = require('../controllers/SaleController');

const routes = Router();

routes.get('/products', ProductController.listAll);
routes.get('/products/:id', ProductController.findById);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.remove);

routes.post('/sales', SaleController.create);

module.exports = routes;
