const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const isExist = await productModel.getName(name);
  if (isExist !== null) {
    return {
    err: { code: 'invalid_data', message: 'Product already exists' } }; 
}
  const product = await productModel.create(name, quantity);
  return { data: product };
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const update = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  return product;
};

const exclude = async (id) => {
  await productModel.exclude(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
