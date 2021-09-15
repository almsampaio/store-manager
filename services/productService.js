const productModel = require('../models/productModel');
const errors = require('../utils/errors');

const verifyName = async (name) => {
  const minLenghtName = 5;
  if (!name) throw errors.shortName;
  if (name.length < minLenghtName) throw errors.shortName;
  const product = await productModel.getProductName(name);
  const productExists = product.filter(({ name: prodName }) => prodName === name && prodName);
  if (productExists.length > 0) throw errors.productAlreadyExists;
};

const verifyQuantity = (quantity) => {
    if (!quantity || quantity < 1) throw errors.shortQuantity;
    if (typeof quantity !== 'number') throw errors.quantityMustBeNumber;
  };
  
const createProduct = async (name, quantity) => {
  verifyQuantity(quantity);
  await verifyName(name);
  const result = await productModel.createProduct(name, quantity);
  return result;
};

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const getOne = async (id) => {
  const result = await productModel.getOne(id);
  if (!result) return errors.wrongIdFormat;
  return result;
};

const updateOne = async (id, name, quantity) => {
  verifyQuantity(quantity);
  await verifyName(name);
  const result = await productModel.updateOne(id, name, quantity);
  return result;
};

const delOne = async (id) => {
  const result = await productModel.delOne(id);
  if (!result) return errors.wrongIdFormat;
  return result;
};

module.exports = {
  getAll,
  createProduct,
  getOne,
  updateOne,
  delOne,
};
