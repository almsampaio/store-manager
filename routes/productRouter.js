const express = require('express');

const productController = require('../controllers/productController');

const routes = express.Router();

routes.get('/', productController.getAll);
routes.post('/', productController.create);
routes.get('/:id', productController.getById);
// routes.put('/:id', productController.update);
routes.delete('/:id', productController.remove);

module.exports = routes;