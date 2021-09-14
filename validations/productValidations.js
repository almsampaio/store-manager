const { listProductName } = require('../models/productModel');

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

const nameExist = async (name) => {
    const product = await listProductName(name);
    console.log(product);
    return product;
};

console.log(nameExist('Name Is Exists'));

const status = 422;

const productValidations = async (name, quantity) => {
if (name.length < 5) return { status, message: nameInvalid };
if (quantity < 1) return { status, message: quantityInvalid };
if (await nameExist(name)) return { status, message: nameExistErr };
if (typeof quantity === 'string') return { status, message: quantityNotString };
return {};
};

module.exports = {
    productValidations,
};
