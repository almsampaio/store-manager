const productsModel = require('../models/Products');

const error = {
  nameLength: '"name" length must be at least 5 characters long',
  nameExists: 'Product already exists',
  isNumberLetterThan: '"quantity" must be larger than or equal to 1',
  isNotString: '"quantity" must be a number',
  isNotIdExists: 'Wrong id format',
};

const code = 'invalid_data';

const validNameLength = (name) => {
  if (name.length < 5) return { err: { code, message: error.nameLength } };
  return false;
};

const isNameExists = async (name) => {
  const products = await productsModel.getAll();
  const productName = products.find((product) => product.name === name);

  if (productName) return { err: { code, message: error.nameExists } };

  return false;
};

const isSmallerOrIqualQuantity = (quantity) => {
  if (quantity <= 0) return { err: { code, message: error.isNumberLetterThan } };
  return false;
};

const isNotNumber = (quantity) => {
  if (typeof (quantity) !== 'number') return { err: { code, message: error.isNotString } };
};

const isIdExists = (id) => {
  if (!id) return { err: { code, message: error.isNotIdExists } };
  return false;
};

const wrongIdFormat = () => ({ err: { code, message: error.isNotIdExists } });

module.exports = {
  validNameLength,
  isNameExists,
  isSmallerOrIqualQuantity,
  isNotNumber,
  isIdExists,
  wrongIdFormat,
};
