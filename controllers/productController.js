const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body; 

  const product = await productService.addProduct(name, quantity);
  res.status(201).json(product);
};

const listProduct = async (req, res) => {
  const list = await productService.listProduct();
  res.status(200).json(list);
};

const listProductId = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.listProductId(id);
  res.status(200).json(productId);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await productService.updateProduct(id, name, quantity);

  res.status(200).json(product);
};

const excludeProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productService.excludeProduct(id);

  res.status(200).json(product);
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
  updateProduct,
  excludeProduct,
};
