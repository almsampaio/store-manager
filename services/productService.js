const ProductsModel = require('../models/productModel');

const nameIsValid = async (name) => {
  if (!name) {
    return { err: { code: 'invalid_data',
    message: 'name length must be at least 5 characters long' } };
  }
  if (typeof name !== 'string') {
    return { err: { code: 'invalid_data',
    message: '"name" must be a string' } };
  } 
  if (name.length < 6) {
    return { err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' } };
  }
  if ((await ProductsModel.findOneByName(name)) !== null) {
    return { err: { code: 'invalid_data',
    message: 'Product already exists' } };
  }
  return true;
};

const quantityIsValid = (quantity) => {
  if (!quantity && quantity !== 0) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be a number' } };
  }
  if (!Number.isInteger(quantity)) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be a number' } };
  }
  if (quantity < 1) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } };
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const isNameValid = await nameIsValid(name);
  const isQuantityValid = quantityIsValid(quantity);

  if (isQuantityValid !== true) return isQuantityValid;
  
  if (isNameValid !== true) return isNameValid;

  const { id } = await ProductsModel
    .create({ name, quantity });
  
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
