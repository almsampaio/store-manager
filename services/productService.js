const productModel = require('../models/productModel');

const validateName = (name) => {
  if (typeof (name) !== 'string') {
    return { 
      code: 'invalid_data',
      message: '"name" must be a string',
    };
  }
  if (name.length < 5) {
    return { 
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return false;
};

const validateQuantity = (quantity) => {
  if (typeof (quantity) !== 'number') {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  if (quantity < 1) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  return false;
};

const validateData = (array, value, key) => {
  const result = array.find((object) => object[key] === value);
  if (!result) return true;
  return false;
};

const createProducts = async (name, quantity) => {
  const isNameValid = validateName(name);
  const isQuantityValid = validateQuantity(quantity);

  if (isNameValid) return isNameValid;
  if (isQuantityValid) return isQuantityValid;

  const data = await productModel.getAll();
  const alreadyExists = validateData(data, name, 'name');

  if (!alreadyExists) {
    return ({
      code: 'invalid_data',
      message: 'Product already exists',
    });
  }

  const response = await productModel.create({ name, quantity });

  return response;
};

module.exports = {
  createProducts,
};
