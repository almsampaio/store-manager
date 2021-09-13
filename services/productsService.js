const productsModel = require('../models/productsModel');
const task = require('../schemas/validationsSchemas');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const create = async (name, quantity) => {
  const validations = task.validateProduct(name, quantity);

  if (validations.message) return { err: validations };

  const productName = await productsModel.getName(name);
  if (productName) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  const creatProduct = await productsModel.create(name, quantity);
  return { products: creatProduct };
};

module.exports = { getAll, create };
