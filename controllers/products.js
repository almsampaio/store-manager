const rescue = require('express-rescue');
const { productsServices } = require('../services');
const { status } = require('../schema');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const create = await productsServices.createService(name, quantity);
  return res.status(status.status.created).json(create);
});

const getProducts = rescue(async (_req, res) => {
  const products = await productsServices.getProductsService();
  return res.status(status.status.ok).json({ products });
});

const getProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getProductService(id);
  return res.status(status.status.ok).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsServices.updateProductService(id, name, quantity);
  return res.status(status.status.ok).json({ _id: id, name, quantity });
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const findProduct = await productsServices.getProductService(id);
  await productsServices.deleteProductService(id);
  return res.status(status.status.ok).json(findProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
 };
