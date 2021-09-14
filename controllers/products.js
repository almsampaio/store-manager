const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const service = require('../services/products');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const createProducts = await service.create(name, quantity);
    // https://github.com/tryber/sd-010-a-store-manager/pull/59
  if (createProducts.err) {
    return res.status(422).json(createProducts);
  }
  return res.status(201).json(createProducts);
});

const getAll = rescue(async (req, res) => {
  const products = await service.getAll();

  res.status(200).json(products);
});
const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const productId = await service.getById(id);
  if (productId.err) {
    return res.status(422).json(productId);
  }
  res.status(200).json(productId);
});

const productUpdate = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await service.productUpdate(id, name, quantity);
  if (updatedProduct.err) {
    return res.status(422).json(updatedProduct);
  }
  res.status(200).json(updatedProduct);
});

const productDelete = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.productDelete(id);
  if (deletedProduct.err) {
    return res.status(422).json(deletedProduct);
  }
  res.status(200).json(deletedProduct);
});

module.exports = {
  getAll,
  create,
  getById,
  productUpdate,
  productDelete,
  
};