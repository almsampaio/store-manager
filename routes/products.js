const express = require('express');

const productsRouter = express.Router();
const productsMiddlewares = require('../middlewares/products');
const productsControllers = require('../controllers/productsControllers');
const errorMiddleware = require('../middlewares/error');

productsRouter.post(
  '/',
  productsMiddlewares.createProductValidation,
  productsControllers.createProduct,
);

productsRouter.use(errorMiddleware);

module.exports = productsRouter;