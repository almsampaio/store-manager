// hello-msc/controllers/Author.js
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

module.exports = {
  getAll,
  create,
  
};