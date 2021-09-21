const services = require('../services');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const newProd = await services.products.createProduct({ name, quantity });

  return res.status(201).json(newProd);
};

const getAllProducts = async (_req, res, _next) => {
  const products = await services.products.getProducts();

  return res.status(200).json({ products });
};

const getProductByID = async (req, res, _next) => {
  const { id } = req.params;
  const [products] = await services.products.getProducts(id);

  return res.status(200).json(products);
};

const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await services.products.updateProduct(id, { name, quantity });

  return res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
};