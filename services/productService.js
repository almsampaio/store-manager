const Product = require('../models/Product');

const errors = {
    nameLength: '"name" length must be at least 5 characters long',
    alreadyExists: 'Product already exists',
};

const verifyName = (productName) => {
  if (typeof productName !== 'string' || productName.length < 5) {
    return false;
  }

  return true;
};

exports.create = async ({ name, quantity }) => {
  if (!verifyName(name)) {
    return { message: errors.nameLength, code: 'invalid_data' };
  }

  const productByName = await Product.findByName(name);

  if (productByName) { 
    return { message: errors.alreadyExists, code: 'invalid_data' };
  }

  const product = await Product.createProduct({ name, quantity });

  return product;
};
