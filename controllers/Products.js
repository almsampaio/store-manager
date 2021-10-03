const Products = require('../services/Products');

const getAllProducts = async (_req, res) => {
  const { status, data } = await Products.getAllProducts();

  res.status(status).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Products.getProductById(id);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await Products.createProduct(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Products.updateProduct(id, req.body);
  res.status(status).json(data);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Products.removeProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
};
