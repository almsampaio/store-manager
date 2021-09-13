const express = require('express');
const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');
// const { validateName, validateQuantity } = require('../middlewares/productMiddleware');

const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_NOT_FOUND = 404;
const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;

const route = express.Router();

route.get('/', async (_req, res) => {
  const response = await salesModel.getAll();

  return res.status(HTTP_OK_STATUS).json({ sales: response });
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await salesService.findById(id);
  if (response.code) {
    return res.status(HTTP_NOT_FOUND).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(response);
});

route.post('/', async (req, res) => {
  const arr = req.body;
  const response = await salesService.createSale(arr);

  if (response.code === 'invalid_data') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
  }
  return res.status(HTTP_OK_STATUS).json(response);
});

route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const soldItems = req.body;
  const response = await salesService.updateSale(id, soldItems);

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

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSale(id);

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

module.exports = route;
