const productService = require('../services/productService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPR_ENTRY_STATUS = 422;

const getAll = async (_req, res) => {
  const allProducts = await productService.listProducts();
  res.status(HTTP_OK_STATUS).json(allProducts);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, createdProduct } = await productService.create(name, quantity);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  res.status(HTTP_CREATED_STATUS).json(createdProduct);
};

module.exports = {
  createProduct,
  getAll,
};
