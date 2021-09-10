const rescue = require('express-rescue');
const ProductsServices = require('../services/products');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.create(name, quantity);
  if (product.err) return res.status(422).json(product);
  console.log(product);
  res.status(201).json(product);
});

module.exports = {
  create,
};