const modelProduct = require('../models/products');
const validations = require('./validations');

const getAll = async () => {
  const productsAll = await modelProduct.getAll();
  return productsAll;
};

const newProduct = async (name, quantity) => {
  const validName = validations.validName(name);
  if (validName) return validName;
  const nameDuplicate = await validations.nameDuplicate(name);
  if (nameDuplicate) return nameDuplicate;
  const notQuantityNegative = validations.notQuantityNegative(quantity);
  if (notQuantityNegative) return notQuantityNegative;
  const notNumberQuantity = validations.notNumberQuantity();
  if (notNumberQuantity) return notNumberQuantity;
  const productNew = await modelProduct.newProduct(name, quantity);
  const { ops } = productNew;
  return ops[0];
};

const searchById = async (id) => {
  const searchId = await modelProduct.searchById(id);
  return searchId;
};

module.exports = {
  getAll,
  newProduct,
  searchById,
};
