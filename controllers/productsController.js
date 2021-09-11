const httpStatus = require('../utils/httpStatus');
const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  res.status(httpStatus.ok).json({ products: result });
};

const getById = async (req, res) => {
  const { product, errorMessage } = await productsServices.getById(req.params.id);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  if (product) {
    res.status(httpStatus.ok).json(product);
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, createdProduct } = await productsServices.create(name, quantity);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  res.status(httpStatus.created).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { errorMessage, updatedProduct } = await productsServices.update(id, name, quantity);

  // const errorMessage = await productsServices.update(id, name, quantity);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  return res.status(httpStatus.ok).json(updatedProduct);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};
