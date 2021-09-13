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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsServices.updateService(id, name, quantity);
  return res.status(status.status.ok).json({ _id: id, name, quantity });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
 };
