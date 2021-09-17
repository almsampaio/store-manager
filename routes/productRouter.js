const express = require('express');

const productController = require('../controllers/productController');

// const { validateNome, validateQty } = require('../middlewares/middleware');

const routes = express.Router();

routes.get('/', productController.getAll);
routes.get('/:id', productController.getById);
routes.delete('/:id', productController.remove);
// routes.post('/', validateNome,
//   validateQty, productController.create);
// routes.put('/:id', validateNome,
//   validateQty, productController.actualize);

module.exports = routes;