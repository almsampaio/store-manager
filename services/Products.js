const { findProduct, createProduct } = require('../models/Products');

const productExists = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const caractersLength = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const verifyString = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const validQuantity = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const verifyName = async (name) => {
  const existsName = await findProduct(name);

  if (existsName) {
    throw productExists;
  }

  if (name.length <= 5) {
    throw caractersLength;
  }

  return name;
};

const verifyQuantity = (quantity) => {
  if (typeof quantity === 'string') {
    throw verifyString;
  }

  if (quantity <= 0) {
    throw validQuantity;
  }

  return quantity;
};

const create = async (name, quantity) => {
  try {
    const respName = await verifyName(name);
    const respQuantity = await verifyQuantity(quantity);
    throw await createProduct(respName, respQuantity);
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
};
