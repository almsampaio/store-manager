const productModel = require('../models/productModel');

const errorValidName = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
};

const errorValidNameExist = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
};

const errorValidQuantity = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
};

const errorValidQuantityIsNumber = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
};

const errorValidProduct = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const validateName = (name) => {
  if (name.length <= 5) throw errorValidName;
};

const validateNameExist = async (name) => {
  const result = await productModel.getProductByName(name);
  if (result) throw errorValidNameExist;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) throw errorValidQuantity;
};

const validateQuantityString = (quantity) => {
  if (typeof quantity !== 'number') throw errorValidQuantityIsNumber;
};

const validateProductExist = (product) => {
  if (!product) throw errorValidProduct;
};

const addProduct = async (name, quantity) => {
  validateName(name);
  await validateNameExist(name);
  validateQuantity(quantity);
  validateQuantityString(quantity);
  const result = await productModel.addProduct(name, quantity);
  return { status: 201, result };
};

const getProducts = async () => {
  const result = await productModel.getProducts();
  return { status: 200, result };
};

const getProductId = async (id) => {
  const result = await productModel.getProductId(id);
  validateProductExist(result);
  return { status: 200, result };
};

module.exports = {
  addProduct,
  getProducts,
  getProductId,
};