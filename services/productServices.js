const { dbConnection } = require('../models/connection');

const model = require('../models');
const { productSchema } = require('./validationSchemas');
const { newError } = require('../utils/newError');

const validateProdDuplicity = async (cntObj, collection, searchString) => {
  const itemExists = await model.findByName(cntObj, collection, searchString);

  if (itemExists) throw new Error('Product already exists');
};

const validateProdSchema = (productData) => {
  const { error } = productSchema.validate(productData);

  if (error) throw new Error(error.message);
};

const createProduct = async (productData) => {
  try {
    validateProdSchema(productData);
    await validateProdDuplicity(dbConnection, 'products', productData.name);

    const data = await model.create(dbConnection, 'products', productData);
  
    return data;
  } catch (error) {
    throw newError(422, error.message, 'invalid_data');
  }
};

module.exports = {
  createProduct,
};
