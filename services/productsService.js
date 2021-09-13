const productsModel = require('../models/productsModel');
const schemas = require('../schemas/validationsSchemas');

const errWrongId = { code: 'invalid_data', message: 'Wrong id format' };

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { err: errWrongId };

  return product;
};

const create = async (name, quantity) => {
  const validations = schemas.validateProduct(name, quantity);
  if (validations.message) return { err: validations };

  const productName = await productsModel.getName(name);
  if (productName) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  const creatProduct = await productsModel.create(name, quantity);
  return { products: creatProduct };
};

const update = async (id, name, quantity) => {
  const validations = schemas.validateProduct(name, quantity);
  if (validations.message) return { err: validations };

  const updateProduct = await productsModel.update(id, name, quantity);
  return { product: updateProduct };
};

const exclude = async (id, name, quantity) => {
  const product = await productsModel.exclude(id);

  if (!product) return { err: errWrongId };

  return { id, name, quantity };
};

module.exports = { getAll, getById, create, update, exclude };
