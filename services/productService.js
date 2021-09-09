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
  // if (isString(name)) return {
  //   err: {
  //     code: 'invalid_data', 
  //     message: '"name" must be a String',
  //   },
  // };
      
  // if (isLengthLetterThan(name, five)) return {
  //   err: {
  //     code: 'invalid_data', 
  //     message: '"name" length must be at least 5 characters long',
  //   },
  // };

  // if (isNumber(quantity)) return {
  //   err: {
  //     code: 'invalid_data', 
  //     message: '"quantity" must be a number',
  //   },
  // };

  // if (isLengthMoreThan(quantity, one)) return {
  //   err: {
  //     code: 'invalid_data', 
  //     message: '"quantity" must be larger than or equal to 1',
  //   },
  // };

  const productsService = await productsModel.create(name, quantity);
  return productsService;
};

module.exports = {
  create,
};
