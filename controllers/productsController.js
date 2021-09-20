const Products = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const { status, data } = await Products.getAllProducts();
  res.status(status).json({ products: data });
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
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await Products.updateProduct(id, name, quantity);

  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Products.deleteProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }; 
