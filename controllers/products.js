const productService = require('../services/products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.create(name, quantity);
  return res.status(201).json(newProduct);
};

module.exports = {
  createProduct,
};
