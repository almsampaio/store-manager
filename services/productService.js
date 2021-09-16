const prodModel = require('../models/productModel');

const validate = (name) => {
  if (!name || name.length < 5 || typeof name !== 'string') {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } };
  }

  return {
    isValid: true,
  };
};

const validateQuantity = (quantity) => {
  if (quantity < 1 || !quantity) {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } };
  }

  if (typeof quantity !== 'number') {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    } };
  }

  return {
    isValid: true,
  };
};

const getAll = async () => {
  const data = await prodModel.getAllProduct();
  return data;
};

const getById = async (id) => {
  const data = await prodModel.getProductById(id);

  if (!data || data === {} || data === undefined) {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } };
  }

  return data;
};

const create = async (name, quantity) => {
  const validated = validate(name);
  const validQuantity = validateQuantity(quantity);

  if (!validated.isValid) return validated;
  if (!validQuantity.isValid) return validQuantity;

  const result = await prodModel.createProduct(name, quantity);

  if (!result) {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: 'Product already exists',
    } };
  }

  return { id: result.id, ...result };
};

module.exports = {
  getAll,
  create,
  getById,
};
