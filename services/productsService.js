const productsModel = require('../models/productsModel');
// const validate = require('./validateProduct');

const validate = (name, quantity) => {
  const minimumNameLength = 5;
  const minimumQuantity = 1;
  // console.log('Validado Nome');

  if (name.length < minimumNameLength) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  }
  
  // console.log('Validado Quantidade');
  if (quantity < minimumQuantity) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  }

  // console.log('Validado Tipo');
  if (typeof (quantity) === 'string') {
    return {
      err: {
        code: 'invalid_data', message: '"quantity" must be a number' } };
  }
};

const create = async (name, quantity) => {
  const result = await validate(name, quantity);
  if (result) {
    return result;
  }
  // console.log(result);

  const exists = await productsModel.findByName(name);
  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } };
  }

  const product = await productsModel.create(name, quantity);
  return { product };
};

const getAll = async () => {
  const products = productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = productsModel.getById(id);
  return product;
};

const editById = async (id, name, quantity) => {
  const result = await validate(name, quantity);
  if (result) {
    return result;
  }

  const product = await productsModel.editById(id, name, quantity);
  return { product };
};

const deleteById = async (id) => {
  const product = productsModel.deleteById(id);
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  editById,
  deleteById,
};