const ProductsModel = require('../models/products');
const validation = require('./validations');

const create = async (name, quantity) => {
  // const { name, quantity } = product;
  const validName = validation.validateNameLength(name);
  if (validName) return validName;

  const availableName = await validation.isAvailable(name);
  if (availableName) return availableName;

  const validQuantity = validation.validateQuantity(quantity);
  if (validQuantity) return validQuantity;

  const newProduct = await ProductsModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  create,
};