const productsService = require('../services/Products');
const {
  HTTP_OK_STATUS,
  HTTP_UNPROCESSED_STATUS } = require('../httpStatus/httpStatus');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(HTTP_OK_STATUS).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productsById = await productsService.getById(id);

  if (productsById.message) return res.status(HTTP_UNPROCESSED_STATUS).json({ err: productsById });
  res.status(HTTP_OK_STATUS).json(productsById);
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const addedProduct = await productsService.addProduct({
    name,
    quantity,
  });

  if (addedProduct.message) {
    return res.status(HTTP_UNPROCESSED_STATUS).json({ err: addedProduct });
  }
  res.status(201).json(addedProduct);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const updatedProduct = await productsService.updateProduct({ id, name, quantity });

  if (updatedProduct.message) {
    return res.status(HTTP_UNPROCESSED_STATUS).json({ err: updatedProduct });
  }
  res.status(HTTP_OK_STATUS).json(updatedProduct);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
};
