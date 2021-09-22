const { createProduct } = require('../models/productsModel');
const { alreadyExists, validName, validNumber,
  validQuantity } = require('./validations');

const CREATED_STATUS = 201;

const create = async (name, quantity) => {
  validName(name);
  await alreadyExists(name);
  validQuantity(quantity);
  validNumber(quantity);
  const result = await createProduct(name, quantity);
  return { status: CREATED_STATUS, result };
};

module.exports = {
  create,
};
