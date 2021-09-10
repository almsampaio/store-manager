const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const create = async (name, quantity) => {
  if (name.length < 5) {
    return { err: 
      { code: 'invalid_data', message: `${name} length must be at least 5 characters long` } };
  }

  const productName = await productModel.getName(name);

  if (productName) {
    return { err: { code: 'invalid_data', message: 'Product already exist' } };
  }

  if (quantity <= 0) {
    return { err: 
        { code: 'invalid_data', message: `${quantity} must be larger than or equal to 1` } };
  }
  
  if (typeof quantity === 'string') {
    return { err: { code: 'invalid_data', message: `${quantity} must be a number` } };
  }

  const creatProduct = await productModel.create(name, quantity);

  return { products: creatProduct };
};

module.exports = { getAll, create };
