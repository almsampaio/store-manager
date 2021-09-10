const express = require('express');

const productsRouter = express.Router();
const productsMiddlewares = require('../middlewares/products');
const productsControllers = require('../controllers/productsControllers');

productsRouter.post(
  '/',
  productsMiddlewares.createProductValidation,
  productsControllers.createProduct,
);

module.exports = productsRouter;