const productModel = require('../models/Products');
const validations = require('../middlewares/productsValidations');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (product === false || product === null) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
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

const update = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  
  const productsValidations = await validations.productsValidations(name, quantity);
  if (productsValidations.err) return productsValidations;
  
  return product;
};

module.exports = {
  getAll,
  create,
  getProductById,
  update,
};
