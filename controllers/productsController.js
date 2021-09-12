const service = require('../services');
const { HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_UNPROCESSABLE_STATUS } = require('../helpers');

// REQUISITO 1 ______________________________________________________________________ //

const createProduct = async (req, res) => {
  const product = req.body;

  const products = await service.productsService.createProduct(product);
  if (products.err) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  }
  return res.status(HTTP_CREATED_STATUS).json(products);
};

// REQUISITO 2 ______________________________________________________________________ //

const getAllProducts = async (_req, res) => {
  const products = await service.productsService.getAllProducts();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await service.productsService.getProductById(id);
  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);
  return res.status(HTTP_OK_STATUS).json(product);
};

// REQUISITO 3 ______________________________________________________________________ //

const editProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const products = await service.productsService.editProduct(id, product);
  if (products.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  return res.status(HTTP_OK_STATUS).json(products);
};

// REQUISITO 4 ______________________________________________________________________ //

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await service.productsService.deleteProduct(id);
  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);
  res.status(HTTP_OK_STATUS).json(product);
};
// ___________________________________________________________________________________ //

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
