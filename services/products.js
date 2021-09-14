const model = require('../models/products'); 
const validate = require('../validations/productValidate');

const create = async (name, quantity) => {
  const existingProduct = await model.findByName(name);
  
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  const valid = await validate.productValidate(name, quantity);
  if (valid) return valid;
  return model.create(name, quantity);
  };

const getAll = async () => model.getAll();
const getById = async (id) => {
  const productId = await model.getById(id);
  if (!productId) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return model.getById(id);
};
const productUpdate = async (id, name, quantity) => {
  const valid = await validate.productValidate(name, quantity);
  if (valid) return valid;
  
  const updatedProduct = await model.productUpdate(id, name, quantity);
  return updatedProduct;
};
  
module.exports = {
    create,
    getAll,
    getById,
    productUpdate,
};