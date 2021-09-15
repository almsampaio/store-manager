const productServices = require('../services/productServices');
const { 
  STATUS_OK,
  STATUS_CREATE } = require('../utils/httpStatus');

const getAll = async (_req, res) => {
  const products = await productServices.getAllProducts();
  return res.status(STATUS_OK).send({ products });
};

const createProduct = async (req, res) => {
  console.log('Controller createProduct()!');
  const { name, quantity } = req.body;
  const product = await productServices.create(name, quantity);
  return res.status(STATUS_CREATE).send(product);
};

module.exports = {
  getAll,
  createProduct,
};