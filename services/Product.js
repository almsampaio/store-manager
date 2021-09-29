const Product = require('../models/Product');

const code = 'invalid_data';

const errors = {
  isLengthLetterThan: '"name" length must be at least 5 characters long',
  isDuplicatedName: 'Product already exists',
  positiveQuantity: '"quantity" must be larger than or equal to 1',
  isQuantityString: '"quantity" must be a number',
};

const nameIsValid = (name) => typeof name === 'string' && name.length >= 5;
const duplicateName = async (name) => {
  const products = await Product.getAll();
  const duplicate = await products.find((p) => p.name === name);
  if (products.length === 0 || duplicate === undefined) {
    return false;
  }
  return true;
};
const quantityIsString = (quantity) => typeof quantity === 'string';
const positiveQuantity = (quantity) => quantity > 0;

const validate = async (name, quantity) => {
  if (!nameIsValid(name)) return { err: { code, message: errors.isLengthLetterThan } };

  if (await duplicateName(name)) return { err: { code, message: errors.isDuplicatedName } };

  if (quantityIsString(quantity)) return { err: { code, message: errors.isQuantityString } };

  if (!positiveQuantity(quantity)) return { err: { code, message: errors.positiveQuantity } };

  return {};
};

const create = async (name, quantity) => {
  const validations = await validate(name, quantity);
  if (validations.err) return validations;

  const newProduct = await Product.createData(name, quantity);

  return newProduct;
};

const findById = async (id) => {
  const product = await Product.findById(id);
  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

module.exports = {
  create,
  findById,
};
