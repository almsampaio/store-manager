// const { ObjectId } = require('mongodb');

const { dbConnection } = require('../models/connection');
const model = require('../models');
const { saleSchema } = require('./validationSchemas');
const { newError } = require('../utils/newError');

const validateSaleArray = (saleArray) => {
  const validationOfSchema = saleArray.map((i) => saleSchema.validate(i));
  const anyErrors = validationOfSchema.find((i) => {
    if (i.error) {
      throw newError(422, 'Wrong product ID or invalid quantity', 'invalid_data');
    }
    return null;
  });
  return anyErrors;
};

const validateProductExistence = async (saleArray) => {
  await Promise.all(saleArray.map(async ({ productId }) => {
    const searchProduct = await model.getByID(dbConnection, 'products', productId);

    if (!searchProduct) throw newError(422, 'Wrong product ID or invalid quantity', 'invalid_data');

    return searchProduct;
  }));
};

const createSale = async (saleArray) => {
  try {
    validateSaleArray(saleArray);
    await validateProductExistence(saleArray);

    const saleObj = { itensSold: saleArray };
    const newSale = await model.create(dbConnection, 'sales', saleObj);

    return newSale;
  } catch (error) {
    throw newError(422, 'Wrong product ID or invalid quantity', 'invalid_data');
  }
};

module.exports = {
  createSale,
};
