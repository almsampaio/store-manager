const productModel = require('../models/products');
const StatusCodes = require('../utils/httpStatusCodes');

const insertOne = async (name, quantity) => {
  const existProduct = await productModel.existsProduct(name);
  if (existProduct) {
    return ({
      err: {
        statusCode: StatusCodes.invalidData,
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  return productModel.insertNewProduct(name, quantity);
};

const findProductById = async (id) => {
  const product = await productModel.findProductById(id);
  if (!product) {
    return ({
      err: {
        statusCode: StatusCodes.invalidData,
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return product;
};

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

module.exports = { insertOne, findProductById };