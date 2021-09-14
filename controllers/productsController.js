const productsService = require('../services/productsService');

const INVALID_REQUEST_422 = 422;
const VALID_NAME_STATUS_201 = 201;
const VALID_GET_REQUEST_200 = 200;

const printMessageOfError422 = (res, product, statusNumber) => {
  const MESSAGE_ERROR_JSON = { err: product.err };
    if (product.status === 422) {
      return res.status(statusNumber).json(MESSAGE_ERROR_JSON);
    }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsService.createProduct({ name, quantity });
  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }
  return res.status(VALID_NAME_STATUS_201).json(products);
};

const getProducts = async (req, res) => {
  const { id } = req.params;

  const products = await productsService.getProducts(id);

  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }

  return res.status(VALID_GET_REQUEST_200).json(products);
};

const putProducts = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const products = await productsService.putProducts(id, name, quantity);

  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }

  return res.status(VALID_GET_REQUEST_200).json(products);
};

module.exports = {
  createProduct,
  getProducts,
  putProducts,
};
