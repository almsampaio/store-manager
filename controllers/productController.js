const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.create(name, quantity);
  res.status(201).json(product);
};

module.exports = {
  create,
};
