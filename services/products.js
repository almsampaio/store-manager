const productsModel = require('../models/Products');
const productsSchemas = require('../schemas/productsSchemas');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const create = async (name, quantity) => {
  const validNameLength = productsSchemas.validNameLength(name);
  if (validNameLength) return validNameLength;

  const isNameExists = await productsSchemas.isNameExists(name);
  if (isNameExists) return isNameExists;

  const isSmallerOrIqualQuantity = productsSchemas.isSmallerOrIqualQuantity(quantity);
  if (isSmallerOrIqualQuantity) return isSmallerOrIqualQuantity;

  const isNotNumber = productsSchemas.isNotNumber(quantity);
  if (isNotNumber) return isNotNumber;

  const newProduct = await productsModel.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const validNameLength = productsSchemas.validNameLength(name);
  if (validNameLength) return validNameLength;

  const isSmallerOrIqualQuantity = productsSchemas.isSmallerOrIqualQuantity(quantity);
  if (isSmallerOrIqualQuantity) return isSmallerOrIqualQuantity;

  const isNotNumber = productsSchemas.isNotNumber(quantity);
  if (isNotNumber) return isNotNumber;

  const updateProduct = await productsModel.update(id, name, quantity);
  return updateProduct;
};

const exclude = async (id) => {
  const excludeProduct = await productsModel.exclude(id);

  const isNotIdExists = productsSchemas.isIdExists(excludeProduct);
  if (isNotIdExists) return isNotIdExists;

  return excludeProduct;
};

// const exclude = async (id) => {
//   const excludeProduct = await productsModel.exclude(id);
//   if (!excludeProduct) return productsSchemas.wrongIdFormat();
//   return excludeProduct;
// };

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
