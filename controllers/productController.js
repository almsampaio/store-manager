const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body; 

  const { product, status, message } = await productService.addProduct(name, quantity);
  if (!product) return res.status(status).json(message);
  res.status(201).json(product);
};

const listProduct = async (req, res) => {
  const list = await productService.listProduct();
  res.status(200).json({ products: list });
};

const listProductId = async (req, res) => {
  const { id } = req.params;

  const { productId, status, message } = await productService.listProductId(id);
  if (!productId) return res.status(status).json(message);

  res.status(200).json(productId);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const { product, message } = await productService.updateProduct(id, name, quantity);
  console.log(product);
  if (!product) return res.status(422).json(message);

  res.status(200).json(product);
};

const excludeProduct = async (req, res) => {
  const { id } = req.params;

  const { product, status, message } = await productService.excludeProduct(id);
  if (!product) return res.status(status).json(message);

  res.status(200).json(product);
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
  updateProduct,
  excludeProduct,
};
