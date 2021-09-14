const productService = require('../services/productService');

exports.getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json({ products });
};

exports.createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { message, code, product } = await productService.create({ name, quantity });

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(201).json(product);
};
