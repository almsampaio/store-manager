const httpStatus = require('../utils/httpStatus');
const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const result = await productsServices.listProducts();
  res.status(httpStatus.ok).json(result);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, createdProduct } = await productsServices.create(name, quantity);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  res.status(httpStatus.created).json(createdProduct);
};

module.exports = {
  createProduct,
  getAll,
};
