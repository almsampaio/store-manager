const productsService = require('../services/productsService');

const INVALID_REQUEST_422 = 422;
const VALID_NAME_STATUS_201 = 201;
const VALID_GET_REQUEST_200 = 200;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct({ name, quantity });
  if (product.err) {
    const MESSAGE_ERROR_JSON = { err: product.err };
    if (product.status === 422) {
      return res.status(INVALID_REQUEST_422).json(MESSAGE_ERROR_JSON);
    }
  }
  return res.status(VALID_NAME_STATUS_201).json(product);
};

const getProducts = async (req, res) => {
  const { id } = req.params;

  const prodducts = await productsService.getProducts(id);

  if (!prodducts) return res.status(INVALID_REQUEST_422).json(prodducts);

  return res.status(VALID_GET_REQUEST_200).json(prodducts);
};

module.exports = {
  createProduct,
  getProducts,
};
