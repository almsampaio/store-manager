const productsModel = require('../Models/productsModel');
const { productsValidate } = require('../validations/productsValidations');

const addProduct = async (name, quantity) => {
  const exists = await productsModel.productExists(name);
  if (exists) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  const validate = productsValidate(name, quantity);

  if (validate) {
    return validate;
  }

  const product = await productsModel.addProduct(name, quantity);

  return product;
};

module.exports = {
  addProduct,
};