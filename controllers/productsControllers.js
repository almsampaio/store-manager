const productsServices = require('../services/productsServices');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await productsServices.createProduct({ name, quantity });

  if (response.message) {
    return next(response);
  }

  return res.status(201).json(response);
};

const getAllProducts = async (_req, res) => {
  const response = await productsServices.getAllProducts();

  return res.status(200).json(response);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const response = await productsServices.getProductById(id);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const response = await productsServices.updateProduct(id, name, quantity);
  return res.status(200).json(response);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const response = await productsServices.deleteProduct(id);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
