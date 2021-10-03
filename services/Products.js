const productModel = require('../models/Products');
const validations = require('../middlewares/productsValidations');
const { HTTP_OK_STATUS } = require('../httpStatus/httpStatus');

const getAll = async () => {
  const products = await productModel.getAll();
  return { status: HTTP_OK_STATUS, data: products };
};

const create = async (name, quantity) => {
  const findProductByName = await productModel.getProductByName(name);

  if (findProductByName) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  const productsValidations = await validations.productsValidations(name, quantity);
  if (productsValidations.err) return productsValidations;

  const product = await productModel.create(name, quantity);
  return product;
};

module.exports = {
  getAll,
  create,
};
