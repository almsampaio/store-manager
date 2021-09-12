const express = require('express');
const productService = require('../services/productService');
const productModel = require('../models/productModel');
// const { validateName, validateQuantity } = require('../middlewares/productMiddleware');

const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const route = express.Router();

route.get('/', async (_req, res) => {
  const response = await productModel.getAll();

  return res.status(HTTP_OK_STATUS).json({ products: response });
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productService.findById(id);
  if (response.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(response);
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

route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await productService.updateProduct(id, name, quantity);

  if (response.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
}

  return res.status(HTTP_OK_STATUS).json({ id, name, quantity });
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productService.deleteProduct(id);

  if (response.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
}

  return res.status(HTTP_OK_STATUS).json(response.product);
});

module.exports = route;
