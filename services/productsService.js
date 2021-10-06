const model = require('../models/productsModel');

const addNewProduct = async (newProduct) => {
  const operation = await model.addNewProduct(newProduct);
  return operation;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return products;
};

const getById = async (id) => {
  const product = await model.getById(id);
  if (product.length === 0) {
    return false;
  }
  return product;
};

const updateProduct = async (id, updatedFields) => {
  const operation = await model.updateProduct(id, updatedFields);
  return operation;
};

const deleteProduct = async (id) => {
  const operation = await model.deleteProduct(id);
  return operation;
};

module.exports = {
    addNewProduct,
    getAllProducts,
    getById,
    updateProduct,
    deleteProduct,
};