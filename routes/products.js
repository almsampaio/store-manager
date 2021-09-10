const express = require('express');

const productsRouter = express.Router();
const productsMiddlewares = require('../middlewares/products');

productsRouter.post('/', productsMiddlewares.createProductValidation, (_req, _res) => {

});

module.exports = productsRouter;