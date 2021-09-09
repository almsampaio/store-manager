const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const app = express();
const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
} = require('../helpers/helpers');

app.use(bodyParser.json());
const service = require('../services/productService');

const createController = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const productsCreated = await service.create(name, quantity);
  if (productsCreated.err) {
    return res.status(HTTP_NO_BODY_STATUS)
    .json(productsCreated);
  }

  return res.status(HTTP_CREATED_STATUS).json(productsCreated);
});

const getAll = rescue(async (_req, res) => {
  const getAllProducts = await service.getAll();
  return res.status(HTTP_OK_STATUS).json({ products: getAllProducts });
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const getProductsById = await service.findById(id);
  if (getProductsById.err) {
  return res.status(HTTP_NO_BODY_STATUS)
    .json(getProductsById); 
}

  // console.log(getProductsById);
  return res.status(HTTP_OK_STATUS).json(getProductsById);
});

const updateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await service.updateById(id, name, quantity);
  if (updateProduct.err) {
    return res.status(HTTP_NO_BODY_STATUS)
    .json(updateProduct);
  }

  console.log(updateProduct);
  return res.status(HTTP_OK_STATUS).json(updateProduct);
});

module.exports = {
  createController,
  getAll,
  findById,
  updateById,
};
