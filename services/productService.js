const productModel = require('../models/productModel');

// const errorNameIsRequired = {
//   err: {
//     code: 'invalid_data',
//     message: 'Name is required' },
//   statusCode: 422 };

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

const createProduct = async (name, quantity) => {
  const createdProduct = await productModel.create(name, quantity);
  if (createdProduct.statusCode === 422) return errorProductAlreadyExists;
  return { product: createdProduct };
};

const create = (name, quantity) => {
  if (name.length <= 5) return errorNameLengthLessThanFive;
  if (quantity <= 0) return errorQuantityLessThanOne;
  if (!quantity) return errorQuantityIsRequired;
  if (typeof (quantity) !== 'number') return errorQuantityMustBeANumber;
  return createProduct(name, quantity);
};

module.exports = {
  create,
};
