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
  console.log(id);     
  const productId = await service.getById(id);
  if (productId.err) {
    return res.status(422).json(productId);
  }
  res.status(200).json(productId);
});

module.exports = {
  getAll,
  create,
  getById,
  
};