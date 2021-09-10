const service = require('../services');
const { HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_UNPROCESSABLE_STATUS } = require('../helpers');

// REQUISITO 1 ______________________________________________________________________ //

const createProduct = async (req, res) => {
  const product = req.body;

  const products = await service.produtsService.createProduct(product);
  if (products.err) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  }
  return res.status(HTTP_CREATED_STATUS).json(products);
};

// REQUISITO 2 ______________________________________________________________________ //

const getAllProducts = async (_req, res) => {
  const products = await service.produtsService.getAllProducts();
  return res.status(HTTP_OK_STATUS).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await service.produtsService.getProductById(id);
  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);
  return res.status(HTTP_OK_STATUS).json(product);
};

// ___________________________________________________________________________________ //

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
