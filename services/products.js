const { del } = require('frisby');
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
  const notNumberQuantity = validations.notNumberQuantity(quantity);
  if (notNumberQuantity) return notNumberQuantity;
  const productNew = await modelProduct.newProduct(name, quantity);
  const { ops } = productNew;
  return ops[0];
};

const searchById = async (id) => {
  const searchId = await modelProduct.searchById(id);
  return searchId;
};

const updateProduct = async (id, name, quantity) => {
  const validName = validations.validName(name);
  if (validName) return validName;
  const notQuantityNegative = validations.notQuantityNegative(quantity);
  if (notQuantityNegative) return notQuantityNegative;
  const notNumberQuantity = validations.notNumberQuantity(quantity);
  if (notNumberQuantity) return notNumberQuantity;
  const update = await modelProduct.updateProduct(id, name, quantity);
  return update;
};

const deleteProduct = async (id) => {
  const delProd = await modelProduct.deleteProduct(id);
  if (!delProd) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return delProd;
};

module.exports = {
  getAll,
  newProduct,
  searchById,
  updateProduct,
  deleteProduct,
};
