const productsService = require('../services/productsService');

const INVALID_REQUEST_422 = 422;
const VALID_NAME_STATUS_201 = 201;
const VALID_REQUEST_200 = 200;

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

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();

  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(products);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;

  const products = await productsService.getProductsId(id);
  
  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(products);
};

const putProducts = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const products = await productsService.putProducts(id, name, quantity);

  if (products.err) {
    return printMessageOfError422(res, products, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(products);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  const del = await productsService.deleteProducts(id);

  if (del.err) {
    return printMessageOfError422(res, del, INVALID_REQUEST_422);
  }

  return res.status(VALID_REQUEST_200).json(del);
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductsId,
  putProducts,
  deleteProducts,
};
