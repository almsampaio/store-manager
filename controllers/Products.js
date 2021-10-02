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
  const { status, data } = await Products.createProduct(name, quantity);

  res.status(status).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
