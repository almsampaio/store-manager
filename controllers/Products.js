const {
  createProduct,
  getAllProducts,
  findProductsById,
  update,
  removeProduct,
} = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await createProduct(name, quantity);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await getAllProducts();
  res.status(status).json({ products: data });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await findProductsById(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, data } = await update(id, name, quantity);
  res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await removeProduct(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};
