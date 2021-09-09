// const { validate } = require('@hapi/joi/lib/base')
const productsModel = require('../models/productModel');
const productSchema = require('../schemas/productSchema');

// const {
//   isString,
//   isNumber,
//   isLengthLetterThan,
//   isLengthMoreThan,
// } = require('../helpers/helpers');

// const five = 5;
// const one = 1;

const create = async (name, quantity) => {
  const exists = await productsModel.findByName(name);
  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  const schema = productSchema(name, quantity);
  if (schema) return schema;

  const productsService = await productsModel.create(name, quantity);
  return productsService;
};

const getAll = async () => {
  const getAllProducts = await productsModel.getAll();
  return getAllProducts;
};

const findById = async (id) => {
  const getProductsById = await productsModel.findById(id);
  if (getProductsById === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return getProductsById;
};

const updateById = async (id, name, quantity) => {
  const getProductsById = await productsModel.updateById(id, name, quantity);
  
  const schema = productSchema(name, quantity);
  if (schema) return schema;

  return getProductsById;
};

const deleteById = async (id) => {
  const deleteProduct = await productsModel.deleteById(id);
  if (deleteProduct === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return deleteProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
