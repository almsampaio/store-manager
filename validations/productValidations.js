const { listProductName, listProductId } = require('../models/productModel');

const nameInvalid = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },       
};

const nameExistErr = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const quantityInvalid = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const quantityNotString = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const IdnoExist = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const nameExist = async (name) => {
  const product = await listProductName(name);
  return product;
};

const status = 422;

const productValidationsGet = async (name, quantity) => {
if (name.length < 5) return { status, message: nameInvalid };
if (quantity < 1) return { status, message: quantityInvalid };
if (typeof quantity === 'string') return { status, message: quantityNotString };
if (await nameExist(name)) return { status, message: nameExistErr };
return {};
};

const productValidationsPut = (name, quantity) => {
  if (name.length < 5) return { status, message: nameInvalid };
  if (quantity < 1) return { status, message: quantityInvalid };
  if (typeof quantity === 'string') return { status, message: quantityNotString };
  return {};
  };

const productIdValidation = async (id) => {
  const productId = await listProductId(id);
  if (!productId) return { status, message: IdnoExist };
  return {};
};

module.exports = {
    productValidationsGet,
    productValidationsPut,
    productIdValidation,
};
