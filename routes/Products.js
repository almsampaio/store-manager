const express = require('express');

const productController = require('../controllers/Products');

const routes = express.Router();

routes.get('/', productController.get);
routes.post('/', productController.create);
routes.get('/:id', productController.get);
routes.put('/:id', productController.update);
routes.delete('/:id', productController.delete);

module.exports = routes;
