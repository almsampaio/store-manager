const productsModel = require('../Models/productsModel');
const { productsValidate } = require('../validations/productsValidations');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return product;
};

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

const updateProduct = async (id, name, quantity) => {
  const validate = productsValidate(name, quantity);

  if (validate) {
    return validate;
  }

  const productToUpdate = await productsModel.updateProduct(id, name, quantity);

  return productToUpdate;
};

const deleteProduct = async (id) => {
  const productToDelete = await productsModel.deleteProduct(id);

  if (!productToDelete) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return productToDelete;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};