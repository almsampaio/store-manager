const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productService.createProduct(name, quantity);
  if (product.err) {
    return res.status(422).json(product);
  }
  res.status(201).json(product);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.getAllProducts();
  res.status(200).json({ products: allProducts });
};

module.exports = {
  createProduct,
  getAllProducts,
};
