const productService = require('../services/productServices');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await productService.addProduct(name, quantity);
  return res.status(status).json(result);
};

const getProducts = async (_req, res) => {
  const { status, result } = await productService.getProducts();
  return res.status(status).json(result);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await productService.getProductId(id);
  return res.status(status).json(result);
};

const updateProductId = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const { status, result } = await productService.updateProductId(id, name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  addProduct,
  getProducts,
  getProductId,
  updateProductId,
};