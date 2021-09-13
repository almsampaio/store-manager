const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, statusCode, product } = await productService.create(name, quantity);
  if (err) return res.status(statusCode).json({ err });

  res.status(201).json(product);
};

module.exports = {
  create,
};
