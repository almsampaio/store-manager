const productModel = require('../models/productModel');

const errorNameLengthLessThanFive = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' },
  statusCode: 422 };

const errorQuantityLessThanOne = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' },
  statusCode: 422 };

const errorQuantityIsRequired = {
  err: {
    code: 'invalid_data',
    message: 'Quantity is required' },
  statusCode: 422 };

const errorQuantityMustBeANumber = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number' },
  statusCode: 422 };

const errorProductAlreadyExists = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists' },
    statusCode: 422 };

// const checkProduct = (name, quantity) => {
//   if (name.length <= 5) return errorNameLengthLessThanFive;
//   if (quantity <= 0) return errorQuantityLessThanOne;
//   if (!quantity) return errorQuantityIsRequired;
//   if (typeof (quantity) !== 'number') return errorQuantityMustBeANumber;
// };

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const createProduct = async (name, quantity) => {
  const createdProduct = await productModel.create(name, quantity);
  if (createdProduct.statusCode === 422) return errorProductAlreadyExists;
  return { product: createdProduct };
};

const create = (name, quantity) => {
  // checkProduct(name, quantity);
  if (name.length <= 5) return errorNameLengthLessThanFive;
  if (quantity <= 0) return errorQuantityLessThanOne;
  if (!quantity) return errorQuantityIsRequired;
  if (typeof (quantity) !== 'number') return errorQuantityMustBeANumber;
  return createProduct(name, quantity);
};

const update = async (id, name, quantity) => {
  // checkProduct(name, quantity);
  if (name.length <= 5) return errorNameLengthLessThanFive;
  if (quantity <= 0) return errorQuantityLessThanOne;
  if (!quantity) return errorQuantityIsRequired;
  if (typeof (quantity) !== 'number') return errorQuantityMustBeANumber;
  const product = await productModel.update(id, name, quantity);
  return product;
};

const remove = async (id) => {
  await productModel.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
