const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const createdPrudct = await productService.createProd(name, quantity);

  res.status(201).json(createdPrudct);
};

module.exports = { createProduct };