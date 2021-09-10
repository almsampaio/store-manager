const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;

const productService = require('../services/productService');

const getAll = rescue(async (_req, res) => {
 const products = await productService.getAll();

 res.status(HTTP_OK_STATUS).json(products);
});

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { err, products } = await productService.create(name, quantity);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json(err);

  res.status(HTTP_CREATED_STATUS).json(products);
});

module.exports = { getAll, create };
