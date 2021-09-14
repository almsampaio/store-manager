const Product = require('../models/Product');

const errors = {
    nameLength: '"name" length must be at least 5 characters long',
    alreadyExists: 'Product already exists',
    largerZero: '"quantity" must be larger than or equal to 1',
    notNumber: '"quantity" must be a number',
};

const verifyName = (productName) => {
  if (typeof productName !== 'string' || productName.length < 5) {
    return false;
  }

  return true;
};

const verifyQuantity = (quantity) => {
  if (quantity < 1) return false;

  return true;
};

const isNumber = (quantity) => {
  if (typeof quantity === 'number') return true;

  return false;
};

const validData = (name, quantity) => {
  if (!verifyName(name)) {
    return { message: errors.nameLength, code: 'invalid_data' };
  }

  if (!verifyQuantity(quantity)) {
    return { message: errors.largerZero, code: 'invalid_data' };
  }

  if (!isNumber(quantity)) {
    return { message: errors.notNumber, code: 'invalid_data' };
  }

  return { isValid: true };
};

const alreadyExists = async (productName) => {
  const productByName = await Product.findByName(productName);

  if (productByName) return true;

  return false;
};

exports.create = async ({ name, quantity }) => {
  const dataValid = validData(name, quantity);
  if (!dataValid.isValid) return dataValid;

  if (await alreadyExists(name)) { 
    return { message: errors.alreadyExists, code: 'invalid_data' };
  } 

  const product = await Product.createProduct({ name, quantity });

  return { product };
};
