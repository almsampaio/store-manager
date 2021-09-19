const productModel = require('../models/productModel');

const errorValidName = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
};

const errorValidNameExist = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
};

const errorValidQuantity = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
};

const errorValidQuantityIsNumber = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
};

const validateName = (name) => {
  if (name.length <= 5) throw errorValidName;
};

const validateNameExist = async (name) => {
  const result = await productModel.getProductByName(name);
  if (result) throw errorValidNameExist;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) throw errorValidQuantity;
};

const validateQuantityString = (quantity) => {
  if (typeof quantity !== 'number') throw errorValidQuantityIsNumber;
};

const addProduct = async (name, quantity) => {
  validateName(name);
  await validateNameExist(name);
  validateQuantity(quantity);
  validateQuantityString(quantity);
  const result = await productModel.addProduct(name, quantity);
  return { status: 201, result };
};

module.exports = {
  addProduct,
};