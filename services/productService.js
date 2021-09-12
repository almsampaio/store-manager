const productModel = require('../models/productModel');
const productSchema = require('../schema/productSchema');

const findById = async (id) => {
 const idExists = productSchema.validateId(id);
  if (idExists === true) {
    const response = await productModel.getById(id);
    if (response.length === 0) return ({ code: 'invalid_data', message: 'Wrong id format' });
    return response[0];
  }
  return (idExists);
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

const updateProduct = async (id, name, quantity) => {
  const isNameValid = productSchema.validateName(name);
  const isQuantityValid = productSchema.validateQuantity(quantity);
  const isIdValid = productSchema.validateId(id);
  if (isNameValid) return ({ code: isNameValid.code, message: isNameValid.message });
  if (isQuantityValid) return ({ code: isQuantityValid.code, message: isQuantityValid.message });
  if (isIdValid !== true) return ({ code: isIdValid.code, message: isIdValid.message });

  const response = await productModel.update(id, { name, quantity });
  return response;
};

const deleteProduct = async (id) => {
  const isIdValid = productSchema.validateId(id);
  if (isIdValid !== true) return ({ code: isIdValid.code, message: isIdValid.message });

  const product = await productModel.getById(id);
  const deleted = await productModel.deleteById(id);

  return { product, deleted };
};

module.exports = {
  createProducts,
  findById,
  updateProduct,
  deleteProduct,
};
