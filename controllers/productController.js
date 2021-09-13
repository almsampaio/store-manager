const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productService.create({ name, quantity });

  if (product.message) {
    return res.status(422).json({ err: product });
  }

  res.status(201).json(product);
};
