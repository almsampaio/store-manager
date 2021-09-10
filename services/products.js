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

module.exports = { insertOne };