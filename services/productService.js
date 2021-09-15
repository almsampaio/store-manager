const productModel = require('../models/productModel');
const { 
  productValidationsGet, 
  productValidationsPut,
  productIdValidation,
} = require('../validations/productValidations');

const addProduct = async (name, quantity) => {
  const validations = await productValidationsGet(name, quantity);
  if (validations.message) return validations;

  const product = await productModel.addProduct(name, quantity);
 
  return { product };
};

const listProduct = async () => {
  const list = await productModel.listProduct();
  return list;
};

const listProductId = async (id) => {
  const validations = await productIdValidation(id);
  if (validations.message) return validations;

  const productId = await productModel.listProductId(id);
  return { productId };
};

const updateProduct = async (id, name, quantity) => {
  const validations = productValidationsPut(name, quantity);
  if (validations.message) return validations;

  const product = await productModel.updateProduct(id, name, quantity);
  return { product };
};

const excludeProduct = async (id) => {
  const validations = await productIdValidation(id);
  if (validations.message) return validations;

  const product = await productModel.listProductId(id);
  await productModel.excludeProduct(id);

  return { product };
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
  updateProduct,
  excludeProduct,
};
