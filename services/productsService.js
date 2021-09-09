const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const minimumNameLength = 5;
  const minimumQuantity = 1;

  if (name.length < minimumNameLength) {
    return {
      err:{
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }};
  }

  if (quantity < minimumQuantity) {
    return {
      err:{
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }};
  }

  if (typeof(quantity) === 'string') {
    return {
      err:{
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }};
  }

  const exists = await productsModel.findByName(name);
  if (exists) {
    return {
      err:{
        code: 'invalid_data',
        message: 'Product already exists'
      }};
  }

  const product = await productsModel.create(name,quantity);
  return { product };
};

module.exports = {
  // getAll,
  // getById,
  create,
  // editById,
  // deleteById
};
