const express = require('express');

const salesController = require('../controllers/Sales');

const routes = express.Router();

routes.get('/', salesController.get);
routes.post('/', salesController.create);
routes.get('/:id', salesController.get);
routes.put('/:id', salesController.update);
routes.delete('/:id', salesController.delete);

module.exports = routes;
