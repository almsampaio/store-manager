const {
  create,
  getAll,
  getById,
  delete: deleteProduct,
  update,
} = require('../models/Products');

const {
  created,
  ok,
 } = require('../utils/httpStatus');

exports.addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await create({ name, quantity });

  res.status(created).json(createdProduct);
};

exports.getAll = async (_req, res) => {
  const products = await getAll();

  res.status(ok).json({ products });
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const product = await getById(id);

  res.status(ok).json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await update(id, { name, quantity });

  res.status(ok).json({ _id: id, name, quantity });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = deleteProduct(id);

  res.status(ok).json(deletedProduct);
};
