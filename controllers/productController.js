const express = require('express');
const productService = require('../services/productService');
// const { validateName, validateQuantity } = require('../middlewares/productMiddleware');

const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const route = express.Router();

route.get('/', (_req, res) => {
  const frase = 'Hello World';

  return res.status(HTTP_OK_STATUS).end(frase);
});

route.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productService.createProducts(name, quantity);

  if (response.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
}

  return res.status(HTTP_CREATED_STATUS).json({ _id: response.id, name, quantity });
});

module.exports = route;
