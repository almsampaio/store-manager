const { productsServices } = require('../services');
const { status } = require('../messages');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const create = await productsServices.addProduct(name, quantity);
  return res.status(status.created).json(create);
};

const findProducts = async (_req, res) => {
  const products = await productsServices.findProducts();
  return res.status(status.ok).json({ products });
};

const findProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findProduct(id);
  return res.status(status.ok).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsServices.updateProduct(id, name, quantity);
  return res.status(status.ok).json({ _id: id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const searchProduct = await productsServices.findProduct(id);
  await productsServices.deleteProduct(id);
  return res.status(status.ok).json(searchProduct);
};

module.exports = {
  addProduct,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct,
 };
