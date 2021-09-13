const Products = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, message, data } = await Products.create(name, quantity);

  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const findAllProducts = async (_req, res) => {
  const { status, data } = await Products.findAllProducts();
  res.status(status).json({ products: data });
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await Products.findProductById(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Products.updateProduct(id, req.body);
  res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Products.deleteProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  create,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
