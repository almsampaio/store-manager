const productsModel = require('../models/productsModel');

async function nameExists(name) {
  // checks if the product's name is in the data
  const productsByName = await productsModel.getByName(name);

  if (!productsByName.length) return { result: false };
  return {
    result: true,
    message: 'Product already exists',
  };
}

async function nameIsValid(name) {
  const nameLength = name.length;

  if (nameLength >= 5) return { result: true };
  return {
    result: false,
    message: '"name" length must be at least 5 characters long',
  };
}

async function quantityIsNumber(quantity) {
  const isNumber = typeof quantity === 'number';

  if (isNumber) return { result: true };
  return {
    result: false,
    message: '"quantity" must be a number',
  };
}

async function quantityIsValid(quantity) {
  const isPositive = quantity > 0;

  if (isPositive) return { result: true };
  return {
    result: false,
    message: '"quantity" must be larger than or equal to 1',
  };
}


async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

async function addProduct({ name, quantity }) {
  const productNameExists = await nameExists(name);
  const productNameIsValid = await nameIsValid(name);
  const productQuantityIsNumber = await quantityIsNumber(quantity);
  const productQuantityIsValid = await quantityIsValid(quantity);

  const code = 'invalid_data';

  if (productNameExists.result) return { code, message: productNameExists.message };
  if (!productNameIsValid.result) return { code, message: productNameIsValid.message };
  if (!productQuantityIsNumber.result) return { code, message: productQuantityIsNumber.message };
  if (!productQuantityIsValid.result) return { code, message: productQuantityIsValid.message };

  const addedProduct = await productsModel.addProduct({ name, quantity });
  return addedProduct;
}

module.exports = {
  getAll,
  addProduct,
};
