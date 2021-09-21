const services = require('../services');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const newProd = await services.products.createProduct({ name, quantity });

  res.status(201).json(newProd);
};

const getAllProducts = async (_req, res, _next) => {
  const products = await services.products.getProducts();

  res.status(200).json({ products });
};

const getProductByID = async (req, res, _next) => {
  const { id } = req.params;
  const [products] = await services.products.getProducts(id);

  res.status(200).json(products);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
};