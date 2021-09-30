const Product = require('../models/Product');

const code = 'invalid_data';

const errors = {
  isLengthLetterThan: '"name" length must be at least 5 characters long',
  isDuplicatedName: 'Product already exists',
  positiveQuantity: '"quantity" must be larger than or equal to 1',
  isQuantityString: '"quantity" must be a number',
};

const nameIsValid = (name) => typeof name === 'string' && name.length >= 5;
const duplicateName = async (id, name) => {
  const products = await Product.getAll();
  const duplicate = await products.find((p) => p.name === name);
  if (products.length === 0 || duplicate === undefined || id !== null) {
    return false;
  }
  return true;
};
const quantityIsString = (quantity) => typeof quantity === 'string';
const positiveQuantity = (quantity) => quantity > 0;

const validate = async (id, params) => {
  const { name, quantity } = params;

  if (!nameIsValid(name)) return { err: { code, message: errors.isLengthLetterThan } };

  if (await duplicateName(id, name)) return { err: { code, message: errors.isDuplicatedName } };

  if (quantityIsString(quantity)) return { err: { code, message: errors.isQuantityString } };

  if (!positiveQuantity(quantity)) return { err: { code, message: errors.positiveQuantity } };

  return {};
};

const create = async (params) => {
  const id = null;
  const validations = await validate(id, params);
  if (validations.err) return validations;

  const newProduct = await Product.createData(params);

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

const update = async (id, params) => {
  const validations = await validate(id, params);
  if (validations.err) return validations;

  const updateProduct = await Product.update(id, params);
  return updateProduct;
};

const deleteOne = async (id) => {
  const deletedProduct = await Product.deleteOne(id);

  if (deletedProduct === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return deletedProduct;
};

module.exports = {
  create,
  findById,
  update,
  deleteOne,
};
