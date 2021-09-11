const productModel = require('../models/productModel');
const productSchema = require('../schema/productSchema');

const findById = async (id) => {
  const data = await productModel.getAll();
  const idExists = productSchema.findValueInArrayOfObjects(data, id, '_id');
  if (idExists) return (idExists);
  return ({ code: 'invalid_data', message: 'Wrong id format' });
};

const createProducts = async (name, quantity) => {
  const isNameValid = productSchema.validateName(name);
  const isQuantityValid = productSchema.validateQuantity(quantity);
  if (isNameValid) return ({ code: isNameValid.code, message: isNameValid.message });
  if (isQuantityValid) return ({ code: isQuantityValid.code, message: isQuantityValid.message });

  const data = await productModel.getAll();
  const alreadyExists = productSchema.findValueInArrayOfObjects(data, name, 'name');

  if (alreadyExists) return ({ code: 'invalid_data', message: 'Product already exists' });
  const response = await productModel.create({ name, quantity });
  return response;
};

module.exports = {
  createProducts,
  findById,
};
